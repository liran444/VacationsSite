const usersDao = require("../dao/users-dao");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const cacheModule = require("../dao/cache-module");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

// Declaring salt which will be used during the Login process for encryption
const RIGHT_SALT = "sdaofikgn30259UJ@#^%srdtt$1";
const LEFT_SALT = "8IHJ3244Toaw7ihjf2093h6t#@$1!^!^";

/**
 * Adds a new user if the username is in fact unique
 * @param {object} userDetails - An object containing user details
 */
async function addUser(userDetails) {
  if (await usersDao.isUserAlreadyExistsByUsername(userDetails.username)) {
    throw new ServerError(ErrorType.USERSNAME_ALREADY_TAKEN);
  }

  await usersDao.addUser(userDetails);
  let successfullLoginResponse = await login(userDetails);
  return successfullLoginResponse;
}

/**
 * Deletes cached user data by token
 * @param {string} token
 */
async function logout(token) {
  cacheModule.deleteByKey(token);
}

/**
 * Returning a successfullLoginResponse which contains relevant information to the client such as - Token
 * while saving crucial data (id, etc...) in cache
 * @param {object} userDetails - An object containing user details
 */
async function login(userDetails) {
  let userData = await usersDao.login(userDetails);

  if (userData == null || userData.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  let saltedUsername = LEFT_SALT + userDetails.username + RIGHT_SALT;
  const jwtToken = jwt.sign({ sub: saltedUsername }, config.secret);

  let cachedObject = {
    id: userData.id,
    user_type: userData.user_type,
  };
  cacheModule.set(jwtToken, cachedObject);

  let successfullLoginResponse = {
    token: jwtToken,
    firstname: userData.firstname,
    lastname: userData.lastname,
    user_type: userData.user_type,
  };
  return successfullLoginResponse;
}

module.exports = {
  addUser,
  login,
  logout,
};

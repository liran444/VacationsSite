const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Adds a new user to the database
 * @param {object} userDetails - An object containing the details of the user
 */
async function addUser({ firstname, lastname, username, password }) {
  let sql =
    "INSERT INTO users (firstname, lastname, username, password) values(?, ?, ?, ?)";
  let parameters = [firstname, lastname, username, password];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Logs the user in, retrieving user data from the database using the provided username and password
 * @param {object} userDetails - An object containing the details of the user
 */
async function login({ username, password }) {
  let sql = "SELECT * FROM users WHERE username = ? and password = ?";
  let parameters = [username, password];

  try {
    let userLoginResult;
    userLoginResult = await connection.executeWithParameters(sql, parameters);

    if (userLoginResult == null || userLoginResult.length == 0) {
      return userLoginResult;
    } else {
      return userLoginResult[0];
    }
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns a boolean value whether a user already exists with the same username
 * @param {string} username - The provided username from the client
 */
async function isUserAlreadyExistsByUsername(username) {
  let sql = "SELECT id FROM users WHERE username = ?";
  let parameters = [username];

  try {
    let isUsernameFoundData;
    isUsernameFoundData = await connection.executeWithParameters(
      sql,
      parameters
    );

    if (isUsernameFoundData == null || isUsernameFoundData.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

module.exports = {
  addUser,
  login,
  isUserAlreadyExistsByUsername,
};

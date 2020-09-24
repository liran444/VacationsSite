const followersDao = require("../dao/followers-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

/**
 * Gets all destinations
 */
async function getUserFollowedVacationsData(user_id) {
  let followed_vacations_data = await followersDao.getUserFollowedVacationsData(
    user_id
  );
  return followed_vacations_data;
}

/**
 * Retrieves the Number of Followers for each vacation
 */
async function getAllFollowersData() {
  let all_followers_data = await followersDao.getAllFollowersData();
  return all_followers_data;
}

/**
 * Unfollows a vacation
 * @param {number} vacation_id - Used to identify the vacation
 * @param {object} userData - contains all the relevant data of the user
 */
async function unfollowVacation(vacation_id, userData) {
  if (userData.user_type === "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED)
  }
  await followersDao.unfollowVacation(vacation_id, userData.id);
}

/**
 * Follows a vacation
 * @param {number} vacation_id - Used to identify the vacation
 * @param {object} userData - contains all the relevant data of the user
 */
async function followVacation(vacation_id, userData) {
  if (userData.user_type === "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED)
  }
  await followersDao.followVacation(vacation_id, userData.id);
}

/**
 * Deletes all of the vacation's followers data
 * @param {number} vacation_id - Used to identify the vacation
 */
async function deleteAllFollowersByVacationID(vacation_id) {
  await followersDao.deleteAllFollowersByVacationID(vacation_id);
}

module.exports = {
  getUserFollowedVacationsData,
  unfollowVacation,
  followVacation,
  getAllFollowersData,
  deleteAllFollowersByVacationID
};

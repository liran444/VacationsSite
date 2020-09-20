const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

/**
 * Gets followed vacations data by user's ID from the database
 */
async function getUserFollowedVacationsData(user_id) {
  let sql = "SELECT vacation_id as 'id' FROM followers WHERE user_id = ?";
  let parameters = [user_id];

  try {
    let followed_vacations_data;
    followed_vacations_data = await connection.executeWithParameters(
      sql,
      parameters
    );

    return followed_vacations_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

/**
 * Gets number of followers for each vacation
 */
async function getAllFollowersData() {
  let sql =
    "SELECT vacation_id, COUNT(user_id) AS 'total_followers' FROM followers GROUP BY vacation_id ORDER BY vacation_id ASC";

  try {
    let all_followers_data;
    all_followers_data = await connection.execute(sql);

    return all_followers_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

/**
 * Inserts a new row declaring which vacation the user just followed
 * @param {number} vacation_id - Used to identify the vacation
 * @param {number} user_id - Used to identify the user
 */
async function followVacation(vacation_id, user_id) {
  let sql = "INSERT into followers (vacation_id, user_id) VALUES(?, ?);";
  let parameters = [vacation_id, user_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Deletes a row declaring which vacation the user just unfollowed
 * @param {number} vacation_id - Used to identify the vacation
 * @param {number} user_id - Used to identify the user
 */
async function unfollowVacation(vacation_id, user_id) {
  let sql = "DELETE FROM followers where vacation_id = ? and user_id = ?";
  let parameters = [vacation_id, user_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Deletes all data regarding who followed the specific vacation
 * @param {number} vacation_id - Used to identify the vacation
 */
async function deleteAllFollowersByVacationID(vacation_id) {
  let sql = "DELETE FROM followers where vacation_id = ?";
  let parameters = [vacation_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

module.exports = {
  getUserFollowedVacationsData,
  unfollowVacation,
  followVacation,
  getAllFollowersData,
  deleteAllFollowersByVacationID
};

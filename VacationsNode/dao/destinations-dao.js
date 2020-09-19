const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

/**
 * Gets all destinations from the database
 */
async function getAllDestinations() {
  let sql = "SELECT * FROM destinations";

  try {
    let destinations_data;
    destinations_data = await connection.execute(sql);

    return destinations_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

module.exports = {
  getAllDestinations,
};

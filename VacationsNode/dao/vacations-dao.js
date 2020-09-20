const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

/**
 * Gets all vacations from the database
 */
async function getAllVacations() {
  let sql =
    "SELECT v.id, d.name AS 'destination', v.destination_id, v.description, DATE_FORMAT(v.start_date, '%Y-%m-%d') AS 'start_date', DATE_FORMAT(v.end_date, '%Y-%m-%d') AS 'end_date', v.price, v.image_file_name FROM vacations v JOIN destinations d ON d.id = v.destination_id WHERE start_date > current_date() ORDER BY v.start_date ASC";
  let parameters = [];

  try {
    let vacations_data;
    vacations_data = await connection.executeWithParameters(sql, parameters);

    return vacations_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

/**
 * Adds a new vacation to the database
 * @param {object} vacationDetails - An object containing the details of the vacation
 */
async function addNewVacation({
  destination_id,
  description,
  start_date,
  end_date,
  price,
  image_file_name,
}) {
  let sql =
    "INSERT INTO vacations (destination_id, description, start_date, end_date, price, image_file_name) VALUES(?, ?, ?, ?, ?, ?)";
  let parameters = [
    destination_id,
    description,
    start_date,
    end_date,
    price,
    image_file_name,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Retrieves the ID of the last inserted Vacation
 */
async function getInsertedVacationID() {
  let sql = "SELECT id FROM vacations ORDER BY id DESC LIMIT 1";

  try {
    let insert_id = await connection.execute(sql);
    return insert_id[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Deletes a vacation from the DB
 * @param {number} id - Used to identify the vacation 
 */
async function deleteVacation(id) {
  let sql = "DELETE from vacations WHERE id = ?";
  let parameters = [id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Updates a vacation in the DB with new details
 * @param {object} vacationDetails - contains all of the details regarding the vacation 
 */
async function editVacation({
  destination_id,
  description,
  start_date,
  end_date,
  price,
  id,
  image_file_name,
}) {
  let sql =
    "UPDATE vacations SET destination_id = ?, description = ?, start_date = ?, end_date = ?, price = ?, image_file_name = ? WHERE id = ?";
  let parameters = [
    destination_id,
    description,
    start_date,
    end_date,
    price,
    image_file_name,
    id,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

module.exports = {
  getAllVacations,
  addNewVacation,
  getInsertedVacationID,
  deleteVacation,
  editVacation,
};

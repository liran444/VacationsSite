const vacationsDao = require("../dao/vacations-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const followersLogic = require("./followers-logic");
const uuid = require("uuid");
const { io } = require("../controllers/sockets-io-controller");

/**
 * Gets all vacations
 */
async function getAllVacations(user_id) {
  let vacations_data = await vacationsDao.getAllVacations();
  let followed_vacations_data = await followersLogic.getUserFollowedVacationsData(
    user_id
  );

  let sorted_vacations_data = sortVacationsByUserFollowing(
    followed_vacations_data,
    vacations_data
  );
  return sorted_vacations_data;
}

function sortVacationsByUserFollowing(followed_vacations_data, vacations_data) {
  vacations_data.sort((a, b) => {
    if (followed_vacations_data.find((element) => element.id === a.id)) {
      a.is_following = true;
    }
    if (followed_vacations_data.find((element) => element.id === b.id)) {
      b.is_following = true;
    }
    if (a.is_following) {
      return -1;
    }
    return 1;
  });

  // vacations_data.forEach((item) => {
  //   console.log(followed_vacations_data);
  //   if (followed_vacations_data.find((element) => element.id === item.id)) {
  //     console.log(item.id);
  //     item.is_following = true;
  //   }
  //    return a.is_following === b.is_following ? 0 : a ? -1 : 1;

  return vacations_data;
}

async function deleteVacation(id, user_type) {
  if (user_type != "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  await followersLogic.deleteAllFollowersByVacationID(id);
  await vacationsDao.deleteVacation(id);

  io.sockets.emit('delete-vacation', id);
}

/**
 * Updates a product's details, but firstly checking if the user is allowed to perform that
 * @param {object} productDetails - An object containing the details of the product
 */
async function editVacation(vacationDetails, user_type) {
  if (user_type != "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  await vacationsDao.editVacation(vacationDetails);
  io.sockets.emit('edit-vacation', vacationDetails);
}
/**
 * Adds a new vacation to the database, but firstly checking if the dates are valid
 * @param {object} vacationDetails - An object containing the details of the new vacation
 */
async function addNewVacation(vacationDetails, user_type) {
  if (user_type != "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  if (areDatesValid(vacationDetails.start_date, vacationDetails.end_date)) {
    await vacationsDao.addNewVacation(vacationDetails);

    let { id } = await vacationsDao.getInsertedVacationID();
    io.sockets.emit('add-vacation', { ...vacationDetails, id });

    return id;
  }

  throw new ServerError(ErrorType.DATE_UNAVAILABLE);
}

/**
 * Returns a boolean value indicating if the ending date is not equal or lower than the starting date
 * @param {string} start_date
 * @param {string} end_date
 */
function areDatesValid(start_date, end_date) {
  let today = new Date();
  let vacationStartDate = new Date(start_date);
  let vacationEndDate = new Date(end_date);

  if (today > vacationStartDate) {
    return false;
  }
  if (vacationStartDate > vacationEndDate) {
    return false;
  }
  return true;
}

/**
 * Uploads an image file, but firstly checking if the user is allowed to perform that
 * and returns the new file name + its extension to the client
 * @param {object} file - An object containing the image file for a vacation
 * @param {string} user_type - Used for extra validation that the user is in fact an admin
 */
async function uploadVacationImage(file, user_type) {
  if (user_type !== "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  const extension = file.name.substr(file.name.lastIndexOf("."));
  const newUuidFileName = uuid.v4();

  file.mv("./uploads/" + newUuidFileName + extension);

  let successfulUploadResponse = newUuidFileName + extension + "";

  return successfulUploadResponse;
}

module.exports = {
  getAllVacations,
  addNewVacation,
  deleteVacation,
  editVacation,
  uploadVacationImage,
};

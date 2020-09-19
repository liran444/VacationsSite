const express = require("express");
const router = express.Router();
const vacationsLogic = require("../logic/vacations-logic");
const cacheModule = require("../dao/cache-module");

// GET http://localhost:3001/vacations/
router.get("/", async (request, response, next) => {
  let authorizationString = request.headers["authorization"];

  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring("Bearer ".length);
  // Extracting userData with the provided token
  let userData = cacheModule.get(token);

  try {
    let vacations_data = await vacationsLogic.getAllVacations(userData.id);
    response.json(vacations_data);
  } catch (error) {
    return next(error);
  }
});

// Only accessible by admins:
// POST http://localhost:3001/vacations/
router.post("/", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the new vacation that's supposed to be added
    let vacationDetails = request.body;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    let insert_id = await vacationsLogic.addNewVacation(
      vacationDetails,
      userData.user_type
    );
    response.json(insert_id);
  } catch (error) {
    return next(error);
  }
});

// Only accessible by admins:
// DELETE http://localhost:3001/vacations/:id
router.delete("/:id", async (request, response, next) => {
  // Extracting the ID from the request's parameters which will be used to identify which Vacation to delete
  let id = request.params.id;

  // Extracting from the request's header the authorization token
  let authorizationString = request.headers["authorization"];

  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring("Bearer ".length);
  // Extracting userData with the provided token
  let userData = cacheModule.get(token);

  try {
    await vacationsLogic.deleteVacation(id, userData.user_type);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// Only accessible by admins:
// PUT http://localhost:3001/vacations/
router.put("/", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the new vacation that's supposed to be added
    let vacationDetails = request.body;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    await vacationsLogic.editVacation(vacationDetails, userData.user_type);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// Only accessible by admins:
// POST http://localhost:3001/vacations/upload_image_file
router.post("/upload_image_file", async (request, response, next) => {
  try {
    // Extracting from the request the image file that's supposed to be uploaded
    const file = request.files.image;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    let successfulUploadResponse = await vacationsLogic.uploadVacationImage(
      file,
      userData.user_type
    );
    response.json(successfulUploadResponse);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

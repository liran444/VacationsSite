const express = require("express");
const router = express.Router();
const followersLogic = require("../logic/followers-logic");
const cacheModule = require("../dao/cache-module");

// GET http://localhost:3001/followers/
router.get("/", async (request, response, next) => {
  try {
    let all_followers_data = await followersLogic.getAllFollowersData();
    response.json(all_followers_data);
  } catch (error) {
    return next(error);
  }
});

// POST http://localhost:3001/followers/follow?vacation_id=?
router.post("/follow", async (request, response, next) => {
  try {
    // Extracting from the request's query the details regarding the new vacation that's supposed to be added
    let vacation_id = request.query.vacation_id;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    await followersLogic.followVacation(vacation_id, userData);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// DELETE http://localhost:3001/followers/unfollow?vacation_id=?
router.delete("/unfollow", async (request, response, next) => {
  // Extracting the ID from the request's query which will be used to identify which Vacation to unfollow
  let vacation_id = request.query.vacation_id;

  // Extracting from the request's header the authorization token
  let authorizationString = request.headers["authorization"];

  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring("Bearer ".length);
  // Extracting userData with the provided token
  let userData = cacheModule.get(token);

  try {
    await followersLogic.unfollowVacation(vacation_id, userData);
    response.json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

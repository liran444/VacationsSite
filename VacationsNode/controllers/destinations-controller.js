const destinationsLogic = require("../logic/destinations-logic");
const express = require("express");
const router = express.Router();

// GET http://localhost:3001/destinations/
router.get("/", async (request, response, next) => {
  try {
    let destinations_data = await destinationsLogic.getAllDestinations();
    response.json(destinations_data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

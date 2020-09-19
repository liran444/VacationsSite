const destinationsDao = require("../dao/destinations-dao");

/**
 * Gets all destinations
 */
async function getAllDestinations() {
  let destinations_data = await destinationsDao.getAllDestinations();

  return destinations_data;
}

module.exports = {
  getAllDestinations,
};

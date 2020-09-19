const expressJwt = require("express-jwt");
const config = require("../config.json");

// Extracting the text from the secret's JSON
let { secret } = config;

function authenticateJwtRequestToken() {
  // Load secret into
  return expressJwt({ secret }).unless({
    path: [
      // Public routes that don't require authentication
      "/users/login",
      "/users/",
      "/socket.io/",
      "/static",
      "/",
      /uploads\/.*/,
    ],
  });
}

module.exports = authenticateJwtRequestToken;

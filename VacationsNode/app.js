// Using require(); to include modules from external sources (files, etc...)
// Third Party modules:
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// Using two modules which help managing file system the file upload
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");

// First Party modules:
const loginFilter = require("./middleware/login-filter");
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const destinationsController = require("./controllers/destinations-controller");
const followersController = require("./controllers/followers-controller");
const { ioInit } = require("./controllers/sockets-io-controller")
const errorHandler = require("./errors/error-handler");

// Declaring a handler for express()
const server = express();

if (!fs.existsSync("./uploads")) {
  // Must create "/uploads" folder if it does not exist.
  fs.mkdirSync("./uploads");
}

// Registering to Middlewares:

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Enables other domains to connect to my server
server.use(cors());

// Extracts the JSON from the body and creates a request.body object containing it:
server.use(express.json());

// A middleware which filters which requests require to be logged in or not
server.use(loginFilter());

//Serve the production on getting port from env, that means we are in Heroku production
if (process.env.PORT) {
  server.use(express.static(path.join(__dirname, 'build')));
}

// Registering to the file upload middleware
server.use(fileUpload());

// On the event of HTTP request that ends with /uploads, serve the uploads folder
server.use("/uploads", express.static("uploads"));

// On the event of HTTP request that ends with /users, usersController handles it
server.use("/users", usersController);

// On the event of HTTP request that ends with /vacations, vacationsController handles it
server.use("/vacations", vacationsController);

// On the event of HTTP request that ends with /destinations, destinationsController handles it
server.use("/destinations", destinationsController);

// On the event of HTTP request that ends with /followers, followersController handles it
server.use("/followers", followersController);

// Registering to an errorHandler middleware which will handle our errors
server.use(errorHandler);

// Declaring that we're listening to port 80
server.listen(process.env.PORT || 80, () => console.log("Listening on http://localhost:80"));

// IO Init
ioInit();
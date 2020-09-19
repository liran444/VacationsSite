// Using require(); to include modules from external sources (files, etc...)
// let ServerError = require("./../errors/server-error");
// let ErrorType = require("./../errors/error-type");
const mysql = require("mysql2");


let isDev = true;

if (process.env.PORT) { isDev = false; }

let sqlConfig = {
  host: isDev ? "localhost" : "35.246.213.29", // Default: PROD, use localhost for dev enviroment(localhost)
  user: "root", // Username
  password: isDev ? "1234" : "uv09n6L7AOoCcJIx", // Password, Default: uv09n6L7AOoCcJIx, use 1234 for dev enviroment(localhost)
  database: "vacations", // Database name
};

// Connection is a communication line to the DB
const connection = mysql.createConnection(sqlConfig);

let sqlTimeout = null;

sqlConnect();

function sqlConnect() {

  // Connect to the database:
  connection.connect((err) => {
    console.log(`MySQL Connect Attempt: ${JSON.stringify(sqlConfig)}`);
    clearTimeout(sqlTimeout);

    // if not NULL
    if (err) {
      console.log("Failed to create connection + " + err);
      let sqlTimeout = setTimeout(2000, () => {
        sqlConnect();
      });
      return;
    }
    // if err is NULL we successfully connected to MySQL
    console.log("We're connected to MySQL");
  });
}

// One function for executing select / insert / update / delete:
function execute(sql) {
  // Shouldn't it be changed to Async Await?
  return new Promise((resolve, reject) => {
    // Providing an SQL query which will determine what we want to do
    connection.query(sql, (err, result) => {
      if (err) {
        // console.log("Error " + err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  // Shouldn't it be changed to Async Await?
  return new Promise((resolve, reject) => {
    // Providing an SQL query which will determine what we want to do
    connection.query(sql, parameters, (err, result) => {
      if (err) {
        //console.log("Error " + err);
        console.log("Failed interacting with DB, calling reject");
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

// Declaring which functions to export...
module.exports = {
  execute,
  executeWithParameters,
  connection
};

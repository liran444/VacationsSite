// Using require(); to include modules from external sources (files, etc...)
// let ServerError = require("./../errors/server-error");
// let ErrorType = require("./../errors/error-type");
const mysql = require("mysql2");


let isDev = true;

if (process.env.PORT) { isDev = false; }

let sqlConfig = {
  host: isDev ? "localhost" : "s1.combinecontrol.com", // Default: PROD, use localhost for dev enviroment(localhost)
  user: isDev ? "root" : "vacations", // Username
  password: isDev ? "1234" : "PDecBnpa3IcvNjfmqlOb", // Password, Default: uv09n6L7AOoCcJIx, use 1234 for dev enviroment(localhost)
  database: "vacations", // Database name
};

let connection;

function handleDisconnect() {
  try {
    console.log(`MySQL Connect Attempt: ${JSON.stringify(sqlConfig)}`);

    connection = mysql.createConnection(sqlConfig); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
      if (err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 5000); // We introduce a delay before attempting to reconnect,
      } else {
        console.log("We're connected to MySQL");
      }
    });


  } catch (e) {
    console.log(`[handleDisconnect] - error: ${JSON.stringify(e)}`)
  }

}

handleDisconnect();

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

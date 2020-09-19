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

// // Connection is a communication line to the DB
// const connection = mysql.createConnection(sqlConfig);
// const connected = false;

// let connectInterval;

// connectInterval = setInterval(() => {
//   console.log("connectInterval")
//   if (!connected) {
//     console.log("connectInterval2")

//     // Connect to the database:
//     connection.connect((err) => {
//       console.log(`MySQL Connect Attempt: ${JSON.stringify(sqlConfig)}`);
//       console.log("connectInterval3")

//       // if not NULL
//       if (err) {
//         console.log("Failed to create connection + " + err);
//         return;
//       }
//       // if err is NULL we successfully connected to MySQL
//       console.log("We're connected to MySQL");
//       connected = true;
//       clearInterval(connectInterval);
//     });

//   }


// }, 5000)


var connection;

function handleDisconnect() {
  try {

    connection = mysql.createConnection(sqlConfig); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
      if (err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
      console.log('db error', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                 // server variable configures this)
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

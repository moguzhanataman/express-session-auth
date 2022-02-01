var mysql = require("mysql2");
var connection = mysql.createConnection({
  database: "mydb",
  host: "localhost",
  user: "root",
  password: "1234",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;

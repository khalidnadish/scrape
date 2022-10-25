const db = require("mysql2");
 
let myDB = "";
  myDB = db.createPool({
    host: "localhost",
    database: "scrape",
    user: "root",
    password: "Leno_1972",
  }).promise();
 
module.exports = { myDB };
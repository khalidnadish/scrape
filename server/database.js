const db = require("mysql2");
 
let myDB = "";
  myDB = db.createPool({
    host: "127.0.0.1",
    database: "scrape",
    user: "root",
    password: "Leno_1972",

    connectionLimit:1000,
    connectTimeout: 60*60*1000,
    // acquireTimeout:60*60*1000,
    // timeout: 60*60*1000

    
  }).promise();
 
module.exports = { myDB };
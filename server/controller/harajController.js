const { log } = require("console");
const dataBase = require("../database");
const lib = require("./lib");
// const log=console.log
/* ------------------------------------------ */
const createDb = (req, res) => {
  let sql = "create database scrape";
  db.query(sql, (err, response) => {
    if (err) {
      throw err;
    }
    console.log("res");
    // response.send("database createed");
  });
  res.send("database createed");
};
// create table  ----------------------------
const createTable = (req, res) => {
  let sql = `CREATE TABLE haraj(
        id int AUTO_INCREMENT,
        authorUsername VARCHAR(255),
        phone  VARCHAR(255),
        pageno int,
        postid VARCHAR(255),
        posttitle VARCHAR(255),
        city  VARCHAR(255),
        postdate int,
        updatedate int,
        authorid VARCHAR(255), PRIMARY KEY (id))`;
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.log("res");
  });
  res.send("TABLE createed");
};

// insert post  ----------------------------
async function addNewPhone(req, response) {
  const isExist = await lib.PhoneisExsit(req.body.newPhoneData.phone);
  if (isExist === undefined) {
    let reporttype = req.body.newPhoneData.reporttype;
    let authorUsername = req.body.newPhoneData.authorUsername;
    let phone = req.body.newPhoneData.phone;
    let city = req.body.newPhoneData.city;
    let postid = req.body.newPhoneData.id;
    let pageno = req.body.newPhoneData.pageno;
    let posttitle = req.body.newPhoneData.title;
    let postdate = req.body.newPhoneData.postDate;
    let updatedate = req.body.newPhoneData.updateDate;
    let authorid = req.body.newPhoneData.authorId;
    const dataArray = [
      reporttype,
      authorUsername,
      phone,
      city,
      postid,
      pageno,
      posttitle,
      postdate,
      updatedate,
      authorid,
    ];
    let sql = `INSERT INTO  haraj  (reporttype ,  authorUsername,  phone,  city,  postid,  pageno,  posttitle,  postdate,  updatedate,  authorid)
   VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const newRow = await dataBase.myDB.execute(sql, dataArray);
    response.send("doneInsert");
    console.log("Done Insert");
    log(newRow[0].insertId);

  } else {
    
    response.send("exist phone data Data ");
   
  }
  return
}
 
/* ------------------------------------------ */
async function showAll(req, response) {
  let sql = "SELECT * FROM haraj";
  const [mydata] = await dataBase.myDB.execute(sql);
  console.log(mydata);
  // response.status(200).send({ datasize: mydata.length, data: mydata });
  response.render("profile",{dataSize: mydata.length, data: mydata});
}

module.exports = {
  addNewPhone,
  createDb,
  createTable,
  showAll,
};

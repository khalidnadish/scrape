const dataBase = require("../database");
const log = console.log;

function delay() {
  const random = Math.random() * 1000;
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), random);
  });
}


async function PhoneisExsit(phone,table) {
  log("start");
  log("phone ",phone);
  log("table ",table);

   
  let sql = `SELECT * FROM ${table} WHERE phone=? `;
  const [isExist] = await dataBase.myDB.execute(sql, [phone]);
  log(
    `>>>>>>>>>>>>> ${phone} /${isExist.length}//${table} <<<<<<<<<<< >>>> PhoneisExsit`
  );
  return isExist[0];
}


/* Create Table */
async function createTable(req, res) {
  tableName=req.query.table
  console.log(req.query)
  let DropStatment=`DROP TABLE IF EXISTS ${tableName}`;
  const isExistTable = await dataBase.myDB.execute(DropStatment);

  let ctreatStatment = `CREATE TABLE  ${tableName} 
        ( id int NOT NULL AUTO_INCREMENT,
        reporttype text,
        authorUsername varchar(255) DEFAULT NULL,
        phone varchar(255) DEFAULT NULL,
        city varchar(255) DEFAULT NULL,
        postid varchar(255) DEFAULT NULL,
        pageno int DEFAULT '0',
        posttitle varchar(255) DEFAULT NULL,
        postdate varchar(255) DEFAULT '0',
        updatedate varchar(255) DEFAULT '0',
        authorid varchar(255) DEFAULT NULL,
        createAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        updateat timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),KEY index2 (phone,city))
        ENGINE=InnoDB AUTO_INCREMENT=330 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;
  const [isExist] = await dataBase.myDB.execute(ctreatStatment);
  log(
    `>>>>>>>>>>>>  table  Done: /${tableName} <<<<<<<<<<< >>>> `
  );
  res.send(`>>>>>>>>>>>>  table  Done: /${tableName} <<<<<<<<<<< >>>> ` )
  return  
}


const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve()
  }))
}

module.exports = {
  PhoneisExsit,
  createTable,
  keypress
};

const dataBase = require("../database");
const log=console.log


function delay() {
    const random = Math.random()*1000
    return new Promise((resolve, reject)=>{
        setTimeout(()=>resolve(),random)})
    }



async function  PhoneisExsit  (phoneno, response)  {
    log("start")
    let sql = `SELECT * FROM haraj WHERE phone=? `
    const [isExist]= await dataBase.myDB.execute(sql,[phoneno]);
    log(`>>>>>>>>>>>>> ${phoneno} /${isExist.length} <<<<<<<<<<< >>>> PhoneisExsit`)
    return isExist[0]
  }
  





module.exports = {
    PhoneisExsit
  };
const dataBase = require("./database");
const log=console.log




const checkIfExist =(req,res,next)=> {
    req.body.checkValue=false
    log(req.body.newPhoneData.phone)
    log(`>>>>>>>>>>>>> ${req.body.newPhoneData.phone}  <<<<<<<<<<< >>>> middileware`)

    let sql = `select phone from  haraj  where phone=${req.body.newPhoneData.phone}`
   dataBase.myDB.execute(sql,
     (err, response) => {
       err && log(err);
       
       if(response.length===0){
        req.body.checkValue=false
        next()
       } else{
        req.body.checkValue=true
        log("Data exisit .. !! >>>> middileware",response.length,req.body.checkValue);
        next()
         
       }

        
     }
   );
next()
}


 



module.exports={checkIfExist}
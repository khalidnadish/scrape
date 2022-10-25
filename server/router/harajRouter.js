
var express = require("express");
var router = express.Router();
var middleware=require("../middleware")
var harajController  = require("../controller/harajController");


router.get("/createdb", harajController.createDb) ;
router.get("/createTable", harajController.createTable) ;
router.post("/insertphone",harajController.addNewPhone) ;
  


router.get("/showall" , harajController.showAll)







module.exports = router;
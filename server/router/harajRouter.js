
var express = require("express");
var router = express.Router();
var harajController  = require("../controller/harajController");



router.post("/insertphone",harajController.addNewPhone) ;
router.get("/showall" , harajController.showAll)

module.exports = router;

var express = require("express");
var router = express.Router();
var lib  = require("../controller/lib");



// router.get("/createdb", harajController.createDb) ;
router.get("/createTable", lib.createTable) ;






module.exports = router;
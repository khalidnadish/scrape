const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
var middleware  = require("./middleware");
const path = require("path");
const app = express();


var harajRouter = require("./router/harajRouter");
// app.use(middleware.test)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.locals.nadish="khalid"

app.use("/hrj", harajRouter);
/* --------------- view template ------------------- */
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'))
/* ----------------------------------------------- */

// app.use(function(req,res,next){
    
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT,DELETE,HEAD");
// res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept")
// next()
// })






app.get("/", (req, res) => {
    res.send("welcome scaper");

  });


// create database ----------------------------



app.listen(3000, () => {
    console.log("listening on http://localhost/3000");
  });
  




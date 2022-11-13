const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
var middleware  = require("./middleware");
const createError =require("http-errors")
const resposeTimeout = require("response-time")
var harajRouter = require("./router/harajRouter");
var libRouter = require("./router/libRouter");
const path = require("path");

const app = express();



/* Error Handler */
app.use((err, req,res,next) => {
  res.status(err.status || 500)
  res.send(
    {error :
      {
        message:err.message,
        status:err.status || 500
      }
    })
  })
/* ----------------------------------------------- */  
  
  
/* middle Ware */
  
app.use(resposeTimeout())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
/* ----------------------------------------------- */

/* Router */
app.use("/lib", libRouter);
app.use("/hrj", harajRouter);
/* ----------------------------------------------- */


/* --------------- view template ------------------- */
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'))
/* ----------------------------------------------- */



/* Basic Route */

app.get("/", (req, res) => {
    res.send("welcome scaper");

  });
/* ----------------------------------------------- */
/* Start Up Server */
app.listen(3000, () => {
    console.log("listening on http://localhost/3000","procces Id " + process.pid );
    
  });
/* ----------------------------------------------- */





/* Shot Down Server */
  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
  });
  
process.on('SIGINT', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
  });
});
/* ----------------------------------------------- */  
  

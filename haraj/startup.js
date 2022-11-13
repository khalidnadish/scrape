var input = require("prompt-sync")({sigint:true})
var general =require("./general")
var estarahat =require("./estarahat")
var all_estarahat =require("./all_estarahat")
const pressAnyKey = require('press-any-key');

const log = console.log;




const Startup =()=>{

  console.log(
    "\x1b[36m%s\x1b[0m",
    "data Type :\n",
    "0-General\n",
    "1-Estrahat\n",
    "2-All Estrahat\n"
  );
  console.log("\x1b[36m%s\x1b[0m", "provide Followind :\n", "page Counter\n");
  let type = input("what Type : ");
  let pageCounter = input("How many Page : ");

  if (pageCounter === undefined) {
    console.log("GoooD Bay ... khalid Please Provide Page Conter");
    return;
  }
  console.log("Page type =  ", type);
  console.log("Page Counter =  ", pageCounter);
  console.log(typeof type);
 
 
 

   if (type === "0") {
    console.log("Page Counter =  ", pageCounter);
    console.log("type = General");
    general.app(parseInt(pageCounter))
    return
};
  if (type === "1") {
    console.log("Page Counter =  ", pageCounter);
    console.log("type = General");
    estarahat.app(parseInt(pageCounter))
    return
};
if (type === "2") {
  console.log("Page Counter =  ", pageCounter);
  console.log("type = General");
  all_estarahat.app(parseInt(pageCounter))
  return
};
}

  Startup()
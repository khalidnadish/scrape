

const yargs= require("yargs")
const fs= require("fs")
 
let output=yargs.argv
console.log(output  )
console.log(output._[0] )
console.log(output.pages )
console.log("page Nm:",output.pages )
console.log("--------------------",process.title )
console.log("--------------------",process.version )
console.log("--------------------",process.platform )
console.log("--------------------",require )
console.log("--------------------",global )
console.log("--------------------",__dirname )
console.log("--------------------",__filename )
console.log("--------------writeFile ------",fs )


 
 






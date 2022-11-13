const fs = require("fs");
const appendData = (data) => {
  const BaseUrl = "https://haraj.com.sa/";
  fs.writeFile(
    "./urlData.json",
    JSON.stringify(data, null, 2) + "\n",
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file created successfully");
      }
    }
  );
};

const reArrangDataToJson=(data)=>{
  console.log(data);
const newData=[]
  for (let index = 0; index < data.url.length; index++) {
      // mydata[index] ={url: "https://haraj.com.sa" + mydata[index], index: index}
      formating={
        url: "https://haraj.com.sa" + data.url[index],
        urlTitle: data.urlTitle[index],
        userName: data.userName[index],
        location: data.city[index]
      }
      newData.push(formating)
    }
    appendData(newData)


}

const appendDataList = (data) => {
  const BaseUrl = "https://haraj.com.sa/";

  fs.writeFile(
    "./urlDataList.json",
    JSON.stringify(data, null, 2) + "\n",
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file created successfully");
      }
    }
  );
};





const logFile = (data) => {
  fs.writeFile(
    "./logFile.json",
    JSON.stringify(data, null, 2) + "\n",
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file created successfully");
      }
    }
  );
};

const SavePhone = (data) => {
  fs.writeFile(
    "./phone.json",
    JSON.stringify(data, null, 2) + "\n",
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file created successfully");
      }
    }
  );
};

const loopInarray = (array) => {
  for (const itm of array) {
    appendData(itm);
    // appendData({ title1: itm });
  }
};



const keypress = async () => {
  console.log(" >>>  press key  <<<< ")
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve()
  }))
}

module.exports = {
  appendData,
  loopInarray,
  SavePhone,
  reArrangDataToJson,appendDataList,
  logFile,
  keypress
};

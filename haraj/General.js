const fetch = require('isomorphic-fetch');
const fnc = require("./func");
 
var moment = require('moment'); // require
var axios = require('axios');
var input = require("prompt-sync")({sigint:true})

let pageNo=80
async function app(pageCounter) {
  //    const phone=await getPhone()
  
  
/* ----------------page Counter------------------------------- */  
  pageNo+=1
  // let pageCounter=process.argv[2];
  console.log(" >>>  general Proccess  <<<< ",pageCounter)
  console.log(" >>>  Proccess  page <<<< ",pageNo)
  
   
 
 
/* ----------------function to grap data------------------------------- */
      const dateWork=moment()
      const startTime =moment()
      const pageStuts = await getmain(pageNo);
      console.log("hasNext Page",pageStuts)
      const endTime = moment()
     
      const logValue = {
        pageNo:pageNo,
        rowBerPage:pageStuts.rowCount,
        date: dateWork.format("L"),
        startTIME: startTime.format("LTS"),
        endTIME: endTime.format("LTS"),
      };

      fnc.logFile(logValue)

/* ----------------check if has next page------------------------------- */      
      if (pageNo  >= pageCounter)
      {
        console.log("mission DONE   goodbay")
        return
      }
/* ----------------delay  Random time bettwen 3 to 10 second ------------------------------- */      
await delay(pageCounter)
   
}

const delay=(pageCounter)=>{
  var min = 3,
  max = 10;
  var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 10
  console.log("Wait for " + rand + " seconds  " + "counter = :"+pageNo);
  setTimeout(app, rand * 1000,pageCounter);


}



// app()
async function getPhone(id) {
    const response=await fetch(
        "https://graphql.haraj.com.sa/?queryName=postContact&token=&clientId=e7HCGEr1-Kmd0-Izny-HqGC-Z7i1VMVQHAqMv3&version=8.2.1%20,%209%2013%20-%209%20-%2022/",
        {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "sec-ch-ua":
              '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            trackid: "",
            Referer: "https://haraj.com.sa/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
          },
          body: `{"query":"query postContact($postId: Int!) {\\n\\t\\t\\n\\t\\tpostContact(postId: $postId)\\n\\t\\t{ \\n            contactText\\n            contactMobile\\n             }\\n\\t\\n\\t}","variables":{"postId":${id}}}`,
          method: "POST",
        }
      );
      const data= await response.json();
      console.log(data.data);
      return data.data.postContact.contactMobile


}



async function getmain(x1) {
  postUrl="https://graphql.haraj.com.sa/?queryName=initialPosts&token=&clientId=e7HCGEr1-Kmd0-Izny-HqGC-Z7i1VMVQHAqMv3&version=8.2.1%20,%209%2013%20-%209%20-%2022/"
  postHeader={
    "headers": {
      "content-type": "text/plain; charset=utf-8",
      "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "trackid": "e30=",
      "Referer": "https://haraj.com.sa/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    },
    "body": `{\"query\":\"query($page:Int) { posts( page:$page) {\\n\\t\\titems {\\n\\t\\t\\tid status authorUsername title city postDate updateDate hasImage thumbURL authorId\\n\\t\\t}\\n\\t\\tpageInfo {\\n\\t\\t\\thasNextPage\\n\\t\\t}\\n\\t\\t} }\",\"variables\":{\"page\":${x1}}}`,
    "method": "POST"
  }


    const response = await fetch(postUrl, postHeader);
      const data= await response.json();
      console.log(data.data.posts.pageInfo.hasNextPage);
      console.log("postdata>>>>:",data.data.posts);
      const newData= []
      for (let index = 0; index < data.data.posts.items.length
        ; index++) {
        
          var postdate1 = moment(new Date(data.data.posts.items[index].postDate * 1000) )
          var updateDate1=moment(new Date(data.data.posts.items[index].updateDate * 1000))
          

          newData.push ({
            pageno:x1,
            id: data.data.posts.items[index].id,
            authorUsername: data.data.posts.items[index].authorUsername,
            title:  data.data.posts.items[index].title,
            city:  data.data.posts.items[index].city,
            postDate: postdate1.format('DD/MM/YYYY, h:mm:ss a'),
            updateDate: updateDate1.format('DD/MM/YYYY, h:mm:ss a'),
            authorId: data.data.posts.items[index].authorId,
            tag:data.data.posts.items[index].tags,
            phone:await getPhone(data.data.posts.items[index].id,),
            tag:await  tagData(data.data.posts.items[index].id,)
          })
                    let newPhoneData = {
                      reporttype: "عام",
                      pageno: x1,
                      id: data.data.posts.items[index].id,
                      authorUsername: data.data.posts.items[index].authorUsername,
                      title: data.data.posts.items[index].title,
                      city: data.data.posts.items[index].city,
                      postDate: postdate1.format('DD/MM/YYYY, h:mm:ss a'),
                      updateDate: updateDate1.format('DD/MM/YYYY, h:mm:ss a'),
                      authorId:  data.data.posts.items[index].authorId,
                      phone: newData[index].phone,
                      tag:newData[index].tag,
                    };








          saveRow(newPhoneData)
        
          
        
      }
      

      fnc.appendDataList(newData)
      
      // fnc.appendDataList(data.data.posts.items)
      return {
        hasNextPage: data.data.posts.pageInfo.hasNextPage,
        rowCount: data.data.posts.items.length,
      };


}



 
 

const saveRow=async (newPhoneData)=>{ 
  table="general"
  const res= await axios.post("http://localhost:3000/hrj/insertphone", { newPhoneData,table})
    .then((res) => {
      // console.log("Data Added Well .. !!",res.status,res.statusText);
      console.log(res.data,res.status,res.statusText);
    })
    .catch((error) => {
      console.log(error);
    }); 
 return   
}



const tagData= async (id) => {
  const getTag=await  fetch("https://graphql.haraj.com.sa/?queryName=detailsPosts_singlePost&token=&clientId=UcEsur6a-29Wf-wK07-sbNy-vBrWISKy4IPUv3&version=8.2.1%20,%209%2013%20-%209%20-%2022/", {
    "headers": {
      "content-type": "text/plain; charset=utf-8",
      "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "trackid": "eyJpZHMiOlsxMDExMjQ3OTZdfQ==",
      "Referer": "https://haraj.com.sa/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    },
    "body": `{\"query\":\"query($ids:[Int]) { posts( id:$ids) {\\n\\t\\titems {\\n\\t\\t\\tid status authorUsername title city postDate updateDate hasImage thumbURL authorId bodyTEXT city tags imagesList commentStatus commentCount upRank downRank geoHash\\n\\t\\t}\\n\\t\\tpageInfo {\\n\\t\\t\\thasNextPage\\n\\t\\t}\\n\\t\\t} }\",\"variables\":{\"ids\":[${id}]}}`,
    "method": "POST"
  });
  const data= await getTag.json();
  // console.log(data.data.posts.pageInfo.hasNextPage);
  console.log("tag data :",data.data.posts.items[0].tags);
  return data.data.posts.items[0].tags

  }






module.exports={app}




const fetch = require('isomorphic-fetch');
const fnc = require("../haraj/func");
async function app(){


//    const phone=await getPhone()
for (let index = 1; index < 2; index++) {
    
    const mainpage=await getmain(index)
    
}

}
app()
async function getPhone() {


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
          },
          body: '{"query":"query postContact($postId: Int!) {\\n\\t\\t\\n\\t\\tpostContact(postId: $postId)\\n\\t\\t{ \\n            contactText\\n            contactMobile\\n             }\\n\\t\\n\\t}","variables":{"postId":63039522}}',
          method: "POST",
        }
      );
      const data= await response.json();
      // console.log(data);


}



async function getmain(x1) {
    // const x1=5


    const response = await fetch("https://graphql.haraj.com.sa/?queryName=initialPosts&token=&clientId=e7HCGEr1-Kmd0-Izny-HqGC-Z7i1VMVQHAqMv3&version=8.2.1%20,%209%2013%20-%209%20-%2022/", {
        "headers": {
          "content-type": "text/plain; charset=utf-8",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "trackid": "e30=",
          "Referer": "https://haraj.com.sa/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"query\":\"query($page:Int) { posts( page:$page) {\\n\\t\\titems {\\n\\t\\t\\tid status authorUsername title city postDate updateDate hasImage thumbURL authorId\\n\\t\\t}\\n\\t\\tpageInfo {\\n\\t\\t\\thasNextPage\\n\\t\\t}\\n\\t\\t} }\",\"variables\":{\"page\":${x1}}}`,
        "method": "POST"
      });
      const data= await response.json();
      // console.log(data.data.posts);
      // console.log(data.pageInfo);
      fnc.appendDataList(data.data.posts)


}




// fetch("https://graphql.haraj.com.sa/?queryName=initialPosts&token=&clientId=e7HCGEr1-Kmd0-Izny-HqGC-Z7i1VMVQHAqMv3&version=8.2.1%20,%209%2013%20-%209%20-%2022/", {
//   "headers": {
//     "content-type": "text/plain; charset=utf-8",
//     "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "trackid": "e30=",
//     "Referer": "https://haraj.com.sa/",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{\"query\":\"query($page:Int) { posts( page:$page) {\\n\\t\\titems {\\n\\t\\t\\tid status authorUsername title city postDate updateDate hasImage thumbURL authorId\\n\\t\\t}\\n\\t\\tpageInfo {\\n\\t\\t\\thasNextPage\\n\\t\\t}\\n\\t\\t} }\",\"variables\":{\"page\":1}}",
//   "method": "POST"
// });

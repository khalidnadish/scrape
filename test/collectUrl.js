const puppeteer = require("puppeteer");
const fs = require("fs");
const fnc = require("./func");
const pageCounter = 50;
const url =
  "https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AD%D8%A7%D8%AA%20%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1";

clickMore(url, pageCounter);

async function clickMore(url, pageCounter) {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  await page.goto(url, { waitUntil: "networkidle2" });
  await navigationPromise;
  await page.setViewport({ width: 500, height: 625 });
  await page.waitForSelector(".tagWrapper > .tagMain > a > #more > span:nth-child(1)");

  var items = [];
  var authorName=[]
  const exists = await page
    .$eval(".tagWrapper > .tagMain > a > #more > span:nth-child(1)", () => true)
    .catch(() => false);

  console.log("btn", exists);
  console.log("pageCounter", pageCounter);

  await page.click(".tagWrapper > .tagMain > a > #more > span:nth-child(1)");

  const mydata = await page.evaluate(
    async ( pageCounter) => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 200;
        var timer = setInterval((pageCounter) => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          document.title = Array.from(
            document.querySelectorAll(".post")
          ).length;
          // --------------------- Grpa item --------------------
          // items = Array.from(document.querySelectorAll(".post ")).map(
            conterItem=  Array.from(
                document.querySelectorAll(".post .postInfo .postTitle a")
              ).map((item) => item.getAttribute("href"))
          items = {
            url: Array.from(
              document.querySelectorAll(".post .postInfo .postTitle a")
            ).map((item) => item.getAttribute("href")),
            urlTitle: Array.from(
              document.querySelectorAll(".post .postInfo .postTitle a")
            ).map((item) => item.innerHTML),
            city: Array.from(document.querySelectorAll(".post .postInfo .postExtraInfo > div.postExtraInfoPart:nth-child(1) > a")).map((item) => item.textContent),
            userName: Array.from(document.querySelectorAll(".post .postInfo .postExtraInfo > div.postExtraInfoPart:nth-child(2) > a")).map((item) => item.textContent)

          };

           
          console.log(items.url.length);

         
       
          if (conterItem.length >= pageCounter) {
            console.log(items.length);
            clearInterval(timer);
            resolve();
          }
          // --------------------- Grpa item --------------------

          // page.waitFor(saveTofile(items));

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);

            resolve();
          }
        }, 1000,pageCounter);
      });
      return items;
    },
    pageCounter 
  );



  console.log("len of data ",mydata.url.length);

  if (mydata.url.length > pageCounter) {
    // for (let index = 0; index < mydata.length; index++) {
    //   mydata[index] ={url: "https://haraj.com.sa" + mydata[index], index: index}
    // }
    fnc.reArrangDataToJson(mydata)
    // fnc.appendData(mydata);
    // collectData(mydata);
  }

  await browser.close();
}


// document.querySelector(selector).click()
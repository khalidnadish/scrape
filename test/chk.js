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
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.setViewport({ width: 500, height: 625 });
  await page.waitForSelector(".tagWrapper > .tagMain > a > #more > span:nth-child(1)");

  var items = [];
  const exists = await page
    .$eval(".tagWrapper > .tagMain > a > #more > span:nth-child(1)", () => true)
    .catch(() => false);

  console.log("btn", exists);
  console.log("pageCounter", pageCounter);

  await page.click(".tagWrapper > .tagMain > a > #more > span:nth-child(1)");

  const mydata = await page.evaluate(
    async ( pageCounter) => {
      // pageCounter=150
   
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
          items = Array.from(
            document.querySelectorAll(".post .postInfo .postTitle a")
          ).map((item) => item.getAttribute("href"));
          // console.log(items);
          console.log("pageCounter ",pageCounter);
          console.log("items.length",items.length);
          if (items.length >= pageCounter) {
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
  console.log(mydata.length);

  if (mydata.length > pageCounter) {
    for (let index = 0; index < mydata.length; index++) {
      mydata[index] = "https://haraj.com.sa" + mydata[index];
    }

    fnc.appendData(mydata);
    // collectData(mydata);
  }

  // await browser.close();
}

async function collectData(data) {
  for (let index = 0; index < 750; index++) {
    await grapData(data[index], index);
  }
}

// grapData(
//   "https://haraj.com.sa/11102694251/%D8%AD%D9%88%D8%B4_%D9%84%D9%84%D8%A8%D9%8A%D8%B9/"
// );
async function grapData(url, index) {
  console.log(url);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  await page.goto(url, { waitUntil: "load" });
  await navigationPromise;

  await page.waitForSelector(
    "#root > div > div.postWrapper > div.postMain > div.details > div.post_header > div > div > div:nth-child(1) > span:nth-child(1) > a > span"
  );
  const userName = await page.$eval(
    "#root > div > div.postWrapper > div.postMain > div.details > div.post_header > div > div > div:nth-child(1) > span:nth-child(1) > a > span",
    (el) => el.innerHTML
  );

  await page.waitForSelector(
    "#root > div > div.postWrapper > div.postMain > div.details > div.post_header > div > div > div:nth-child(2) > span:nth-child(1) > a > span"
  );
  const userLocation = await page.$eval(
    "#root > div > div.postWrapper > div.postMain > div.details > div.post_header > div > div > div:nth-child(2) > span:nth-child(1) > a > span",
    (el) => el.innerHTML
  );

  await page.waitForSelector(
    ".details > .post_body > .post_extra_info > .contact > .sc-bdvvaa"
  );
  // debugger
  await page.click(
    ".details > .post_body > .post_extra_info > .contact > .sc-bdvvaa"
  );

  await page.waitForSelector(
    "#modal > div > div > a:nth-child(4) > div:nth-child(2)"
  );
  const searchValue = await page.$eval(
    "#modal > div > div > a:nth-child(4) > div:nth-child(2)",
    (el) => el.innerHTML
  );

  console.log(searchValue);
  console.log(userName);
  value = {
    name: userName,
    phone: searchValue,
    location: userLocation,
    counter: index,
  };
  fnc.SavePhone(value);
  await browser.close();
}

// await page
// .waitForSelector(`[class*="header-content"] span:nth-child(2)`)
// .then(() => {
//   console.log("Success")
// })
// .catch((err) => {
//   console.log("Timeout or other error: ", err)
// })

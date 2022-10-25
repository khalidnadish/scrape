const puppeteer = require("puppeteer");

clickMore();

async function clickMore() {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(
    "https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AD%D8%A7%D8%AA%20%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1"
  );

  await page.setViewport({ width: 1366, height: 625 });

  await page.waitForSelector(
    ".tagWrapper > .tagMain > a > #more > span:nth-child(1)"
  );
  //   const chk= await page.$( ".tagWrapper > .tagMain > a > #more > span:nth-child(1)")

  //   console.log(chk);
  const exists = await page
    .$eval(".tagWrapper > .tagMain > a > #more > span:nth-child(1)", () => true)
    .catch(() => false);

  console.log(exists);
  await page.click(".tagWrapper > .tagMain > a > #more > span:nth-child(1)");
  //   await autoScroll("https://haraj.com.sa/");

  //   scroll("https://haraj.com.sa/");

  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        document.title = Array.from(document.querySelectorAll(".post")).length;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);

          resolve();
        }
      }, 1000);
    });
  });

  //   await browser.close();    n
}

// async function scroll(url) {
//   //   const browser = await puppeteer.launch({
//   //     headless: false,
//   //   });
//   //   const page = await browser.newPage();
//   await page.goto(url);
//   await page.setViewport({
//     width: 1200,
//     height: 800,
//   });

//   await autoScroll(page);

//   await page.screenshot({
//     path: "jd.png",
//     fullPage: true,
//   });

//   //   await browser.close();
// }

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

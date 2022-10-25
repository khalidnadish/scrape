const fs = require("fs");
const puppeteer = require("puppeteer");

const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {
  let items = [];
  console.log("starting scrape");
  while (true) {
    // items = await page.evaluate(() => {
    //   const items = Array.from(document.querySelectorAll(".post"));
    //   console.log(items);
    //   return items.map((item) => item.innerText);
    // });

    previousHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  //   return items;
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(
    "https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AD%D8%A7%D8%AA%20%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1"
  );

  await page.waitForSelector(
    ".tagWrapper > .tagMain > a > #more > span:nth-child(1)"
  );

  await page.click(".tagWrapper > .tagMain > a > #more > span:nth-child(1)");

  const items = await scrapeInfiniteScrollItems(page, 100);
  console.log(items.length);

  //   fs.writeFileSync("items.json", JSON.stringify(items));
  //   await browser.close();
})();

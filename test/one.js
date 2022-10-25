const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(
    "https://haraj.com.sa/tags/%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1"
  );

  const clickMore = await page.click(
    "#postsList > div > div.postInfo > div.postTitle > a"
  );

  const clickMore1 = await page.click(
    "#root > div > div.postWrapper > div.postMain > div.details > div.post_body > div > span > button"
  );
  //   const post = await page.waitForXPath('//*[@id="modal"]/div/div/a[2]/div[2]');
  const post = await page.$x('//*[@id="modal"]/div/div/a[2]/div[2]');

  console.log(post);
  //   //   const ph = await page.$eval(
  //   //     "#modal>div>div>a:nth-child(4)>div:nth-child(2)",
  //   //     (xy) => xy.textContent
  //   //   );
  //   const info = await page.$$eval(
  //     ".ContactOptions__ModalContactList-sc-1nekawi-0.kRAnPR>a>.ContactOptions__ModalContactRow-sc-1nekawi-1.jgiPNj",
  //     (infox) => infox.map((a) => a.innerHTML)
  //   );
  //   console.log(info);

  //   await browser.close();
})();

// document.querySelector("#modal > div > div > a:nth-child(4) > div:nth-child(2)")
//   .textContent;

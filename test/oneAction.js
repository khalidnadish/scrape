const puppeteer = require("puppeteer");
const fs = require("fs");
const url =
  "https://haraj.com.sa/tags/%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1";
const func = require("./func");
/*  */
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load" });

  const firstText = await page.evaluate(() => {
    const text1 = Array.from(document.querySelectorAll("div.post.odd")).map(
      (b) => b.textContent
    );

    return text1;
  });

  console.log(firstText);
  func.loopInarray(firstText);

  // const photos = await page.$$eval("img", (imgs) => {
  //   return imgs.map((x) => x.src);
  // });

  await browser.close();
})();

// Array.from(document.querySelectorAll("div.post.odd")).map((b)=>b.innerText.trim())

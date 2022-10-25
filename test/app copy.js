const puppeteer = require("puppeteer");
const fs = require("fs");
const func = require("../haraj/func");
// const d1 = { name: "khald", type: "directory", mode: "read", size: "size" };
// func.appendData(d1);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/React_(JavaScript_library)");
  // await page.screenshot({ path: "test.png", fullPage: true });

  const firstText = await page.evaluate(() => {
    const text1 = document.querySelector(".firstHeading.mw-first-heading");

    return text1.textContent;
  });

  // func.appendData({ test: firstText, img: photo });

  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map((x) => x.src);
  });
  console.log(photos);
  for (const photo of photos) {
    const imgfile = await page.goto(photo);
    func.appendData({ filename: photo.split("/").pop(), img: photo });
    fs.writeFile(photo.split("/").pop(), await imgfile.buffer());
  }

  await browser.close();
})();

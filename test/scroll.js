const fs = require("fs");
const puppeteer = require("puppeteer");

const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {
  let items = [];

  while (itemTargetCount > items.length) {
    items = await page.evaluate(() => {
      const items = Array.from(document.querySelector("#root"));
      console.log(items);
      return items.map((item) => item.innerText);
    });

    previousHeight = await page.evaluate("document.body.scrollHeight");
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return items;
};

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

  const phone = await page.evaluate(() => {
    const text1 = Array.from(
      document.querySelectorAll(
        ".ContactOptions__ModalContactList-sc-1nekawi-0.kRAnPR a"
      )
    ).map((b) => {
      console.log(b.innerHTML);
      console.log(b);
    });

    // const text1 = document.querySelector(
    //   "#modal > div.modal_content > div.ContactOptions__ModalContactList-sc-1nekawi-0.kRAnPR a"
    // );
    //
    // return text1.textContent;
  });

  // console.log(phone);
  //   await page.goto(
  //     "https://haraj.com.sa/tags/%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1#more"
  //   );
  //   const items = await scrapeInfiniteScrollItems(page, 100);

  //   fs.writeFileSync("items.json", JSON.stringify(items));
  await browser.close();
})();

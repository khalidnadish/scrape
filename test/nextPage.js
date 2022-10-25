const puppeteer = require("puppeteer");

NextPage();

async function NextPage() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(20000);
  await page.setDefaultTimeout(10000);

  await page.goto("https://haraj.com.sa/11102918889", {
    waitUntil: "networkidle2",
  });

  await page.setViewport({ width: 1344, height: 698 });

  for (let index = 0; index < 100; index++) {
    clikc1(page);
    const phonenumber = getNum(page, index);
    closebtn(page);

    var nextPageHref = await page.evaluate(() => {
      const text1 = document
        .querySelector(".next_post_btn")
        .getAttribute("href");
      return text1;
    });

    await page.goto(`https://haraj.com.sa${nextPageHref}`, {
      waitUntil: "load",
      timeout: 5000,
    });

    console.log(phonenumber, index, nextPageHref);
  }

  //   await browser.close();
}

/* -------------------------------------------- */
const clikc1 = async (page) => {
  await page.waitForSelector(
    ".details > .post_body > .post_extra_info > .contact > .sc-bdvvaa"
  );
  await page.click(
    ".details > .post_body > .post_extra_info > .contact > .sc-bdvvaa"
  );
};

/* --------------------- */
const getNum = async (page, index) => {
  let selector =
    "#modal > .modal_content > .ContactOptions__ModalContactList-sc-1nekawi-0 > .ContactOptions__ModalContactRow-sc-1nekawi-1:nth-child(4) > div:nth-child(2)";
  const chkselector = await page.waitForSelector(selector, { visible: true });

  const firstText = await page.evaluate(() => {
    const text1 = document.querySelector(selector);
    document.title = index;

    return text1.innerHTML;
  });
  return firstText;
};
/* --------------------- */
const closebtn = async (page) => {
  await page.waitForFunction(
    "document.querySelector('#close_btn') && document.querySelector('#close_btn').clientHeight != 0"
  );
  await page.waitForFunction(
    "document.querySelector('#close_btn') && document.querySelector('#close_btn').style.visibility != 'hidden'"
  );
  const btnNext = await page.$("#close_btn");
  await btnNext.click();
};
/* -------------------------------------------- */

const nextPageUrl = async (page) => {
  var nextPageHref = await page.evaluate(() => {
    const text1 = document.querySelector(".next_post_btn").getAttribute("href");

    return text1;
  });
  console.log(nextPageHref);
  return nextPageHref;
};

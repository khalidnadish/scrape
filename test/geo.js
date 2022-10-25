const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://haraj.com.sa/");

  await page.setViewport({ width: 1366, height: 625 });

  await page.waitForSelector(
    "#postsList > .post:nth-child(2) > .postInfo > .postTitle > a"
  );
  await page.click(
    "#postsList > .post:nth-child(2) > .postInfo > .postTitle > a"
  );

  await page.waitForSelector(
    ".details > .post_body > .post_extra_info > .contact > .sc-bdvvaa"
  );
  await page.click(
    ".details > .post_body > .post_extra_info > .contact > .sc-bdvvaa"
  );

  await page.waitForSelector(
    "#modal > .modal_content > .ContactOptions__ModalContactList-sc-1nekawi-0 > .ContactOptions__ModalContactRow-sc-1nekawi-1:nth-child(4) > div:nth-child(2)"
  );
  //   await page.click(
  //     "#modal > .modal_content > .ContactOptions__ModalContactList-sc-1nekawi-0 > .ContactOptions__ModalContactRow-sc-1nekawi-1:nth-child(4) > div:nth-child(2)"
  //   );

  const firstText = await page.evaluate(() => {
    const text1 = document.querySelector(
      "#modal > .modal_content > .ContactOptions__ModalContactList-sc-1nekawi-0 > .ContactOptions__ModalContactRow-sc-1nekawi-1:nth-child(4) > div:nth-child(2)"
    );

    return text1.textContent;
  });
  console.log(firstText);

  await browser.close();
})();

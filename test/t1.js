const fs = require("fs");
const puppeteer = require("puppeteer");
const alert = require("alert");

let items = [];

const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {
  let title = "";
  await page.waitForSelector(
    ".tagWrapper > .tagMain > a > #more > span:nth-child(1)"
  );

  await page.click(".tagWrapper > .tagMain > a > #more > span:nth-child(1)");

  const isElementVisible = async (page, cssSelector) => {
    let visible = true;
    await page
      .waitForSelector(cssSelector, {
        visible: true,
        timeout: 2000,
      })
      .catch(() => {
        visible = false;
      });
    if (!visible) {
      await page.waitForSelector(
        ".tagWrapper > .tagMain > a > #more > span:nth-child(1)"
      );
      await page.click(
        ".tagWrapper > .tagMain > a > #more > span:nth-child(1)"
      );
    }
    return visible;
  };

  let loadMoreVisible = await isElementVisible(
    page,
    ".tagWrapper > .tagMain > a > #more > span:nth-child(1)"
  );
  while (loadMoreVisible) {
    alert(loadMoreVisible);
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 1200;
        var cnt = 0;
        const chkbtn = async () => {
          await page.$(
            ".tagWrapper > .tagMain > a > #more > span:nth-child(1)",
            (b) => b
          );
        };

        const scrl = () => {
          cnt = cnt + 1;
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          title = Array.from(document.querySelectorAll(".post")).length;
          document.title = title;
          //   alert(totalHeight);
          //   alert(cnt);
          const tt = chkbtn();
          alert(tt);
          console.log(totalHeight);
          if (cnt === 10) {
            // alert(cnt);
            // clearInterval(timer);
          }
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            alert("done");
            resolve();
          }
        };

        var timer = setInterval(() => {
          scrl();
        }, 1000);

        // const yy = grapData(page);
      });
    });

    loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
  }

  //   while (true) {
  //     await page.evaluate(async () => {
  //       await new Promise((resolve, reject) => {
  //         var totalHeight = 0;
  //         var distance = 1200;
  //         var cnt = 0;
  //         const chkbtn = async () => {
  //           await page.$(
  //             ".tagWrapper > .tagMain > a > #more > span:nth-child(1)",
  //             (b) => b
  //           );
  //         };

  //         const scrl = () => {
  //           cnt = cnt + 1;
  //           var scrollHeight = document.body.scrollHeight;
  //           window.scrollBy(0, distance);
  //           totalHeight += distance;
  //           title = Array.from(document.querySelectorAll(".post")).length;
  //           document.title = title;
  //           //   alert(totalHeight);
  //           //   alert(cnt);
  //           const tt = chkbtn();
  //           alert(tt);
  //           if (cnt === 10) {
  //             // alert(cnt);
  //             // clearInterval(timer);
  //           }
  //           if (totalHeight >= scrollHeight) {
  //             clearInterval(timer);
  //             alert("done");
  //             resolve();
  //           }
  //         };

  //         var timer = setInterval(() => {
  //           scrl();
  //         }, 1000);

  //         // const yy = grapData(page);
  //       });
  //     });

  //     // previousHeight = await page.evaluate("document.body.scrollHeight");
  //     // await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
  //     // await page.waitForFunction(
  //     //   `document.body.scrollHeight > ${previousHeight}`
  //     // );
  //     // await new Promise((resolve) => setTimeout(resolve, 1000));
  //   }

  return items;
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(
    "https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AD%D8%A7%D8%AA%20%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1"
  );

  const items = await scrapeInfiniteScrollItems(page, 100);

  //   fs.writeFileSync("items.json", JSON.stringify(items));
})();

// Array.from(document.querySelectorAll(".post .postInfo .postTitle")).map((g)=>g.textContent)

// const fs = require("fs");
// const puppeteer = require("puppeteer");

// const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {
//   let items = [];

//   while (itemTargetCount > items.length) {
//     items = await page.evaluate(() => {
//       const items = Array.from(document.querySelectorAll("#boxes > div"));
//       return items.map((item) => item.innerText);
//     });

//     previousHeight = await page.evaluate("document.body.scrollHeight");
//     await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
//     await page.waitForFunction(
//       `document.body.scrollHeight > ${previousHeight}`
//     );
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }

//   return items;
// };

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });

//   const page = await browser.newPage();
//   await page.goto("https://intoli.com/blog/scrape-infinite-scroll/demo.html");

//   const items = await scrapeInfiniteScrollItems(page, 200);

//   fs.writeFileSync("items.json", JSON.stringify(items));
// })();

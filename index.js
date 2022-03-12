const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const results = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://codeeatingants.com/");
  //   await page.screenshot({ path: "pptr.png" });

  // this code is to get the section title text
  const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".section__title")).map(
      (e) => e.textContent
    );
  });
  fs.writeFile("name.txt", result.join("\r\n"), "utf8");

  //   all the code below is for the image part
  //   const allImg = await page.$$eval("img", (images) => {
  //     return images.map((x) => x.src);
  //   });

  //   for (const img of allImg) {
  //     const imagePage = await page.goto(img);
  //     await fs.writeFile(
  //       img.split("/").pop(),
  //       await imagePage.buffer(),
  //       "binary"
  //     );
  //   }

  await browser.close();
};

results();

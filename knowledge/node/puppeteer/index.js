const puppeteer = require("puppeteer");

(async () => {
    await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://y.qq.com");
    browser.close();
})();

// https://luodao.me/post/puppeteer-pakeng.html
// https://www.lazycoffee.com/articles/view?id=5abe08ed5434e158323c6e1e
// https://segmentfault.com/a/1190000011382062
// https://github.com/GoogleChrome/puppeteer/issues/560
// linux 下的 puppeteer

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // slow down by 250ms
  });
  const page = await browser.newPage();
  await page.goto('http://www.cyokodog.net');
  
  // evaluate()にてページでconsole.logされたやつは通常表示されないけど
  // 以下のようにすることで表示される
  page.on('console', (...args) => console.log('PAGE LOG:', ...args));
  await page.evaluate(() => console.log(`url is ${location.href}`));  
  
  browser.close();
})();
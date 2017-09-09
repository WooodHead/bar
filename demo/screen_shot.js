const fs = require('fs');
const assert = require('assert');
const puppeteer = require('puppeteer');

(async() => {

  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();
  await page.goto('http://www.google.com');
  await page.screenshot({path: 'example.png'});

  browser.close();
  assert(fs.existsSync('example.png'));
  console.log(' 🎉 ');
})();

const puppeteer = require('puppeteer');
(async() => {
  // const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
    slowMo: 1000
  });

  const page = await browser.newPage();

  await page.setRequestInterceptionEnabled(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url.endsWith('.png') || interceptedRequest.url.endsWith('.jpg'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });

  // await page.goto('http://www.google.com', {waitUntil: 'networkidle'});
  await page.goto('http://www.cyokodog.net', {waitUntil: 'networkidle'});
  
  // Type our query into the search bar
  await page.type('puppeteer');
  await page.click('input[type="submit"]');
  // Wait for the results to show up
  await page.waitForNavigation();
  await page.screenshot({path: `puppeteer_${(new Date()).getTime()}.png`});
  browser.close();
})();
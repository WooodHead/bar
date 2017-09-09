const puppeteer = require('puppeteer');

let browser;

module.exports = async () => {
  if (!browser) {
    return createServer().then(async app => {
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false,
        // slowMo: 250
      });
      return Promise.resolve(browser);
      });
  }
  return Promise.resolve(browser);
};

function createServer(){

  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect();
  
  //静的コンテンツを返せる
  app.use(serveStatic(__dirname));
  
  console.log('Server running on 8080');

  return new Promise((resolve, reject) => {
    setTimeout(function(){
      app.listen(8080, () => resolve(app));
    }, 10000);
  });

}


// const EventEmitter = require('events')

// const runner = new EventEmitter();

// module.export = runner;
// let cache;

// module.exports = {
//   browser: () => {
//     if (cache) {
//       return cache;
//     }
//     cache = puppeteer.launch({
//         // args: ['--no-sandbox'],
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       headless: true,
//       // slowMo: 250
//     });
//     return cache;
//   }
// }


// const puppeteer = require('puppeteer');
// const runner = require('./runner');

// (async () => {


//   let browser, page;

//   browser = await puppeteer.launch({
//       // args: ['--no-sandbox'],
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     headless: true,
//     // slowMo: 250
//   });



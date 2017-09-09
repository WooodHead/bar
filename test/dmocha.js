const puppeteer = require('puppeteer');
// const runner = require('./runner');

// async function runPuppeteer() {
//   const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//   const page = await browser.newPage();
//   browser.close();
// }
// runPuppeteer();


function createServer(){

  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect();
  
  //静的コンテンツを返せる
  app.use(serveStatic(__dirname));
  
  console.log('Server running on 8080');

  return new Promise((resolve, reject) => {
    app.listen(8080, () => {
      return resolve(app)
    });
  });

}

createServer().then(app => {

  var Mocha = require('mocha');

  var mocha = new Mocha();

  // mocha.addFile('test/foo.js');
  // mocha.addFile('test/bar.js');
  mocha.addFile('test/e2e.js');
  
  // Run the tests.
  mocha.run(function(failures){

    process.on('exit', function () {
      process.exit(failures);  // exit with non-zero status if there were failures
    });

console.log('shotdown');

    // app.shotdown();

  });

});








// let browser, page;
// (async function(){
//   browser = await puppeteer.launch({
//     args: ['--no-sandbox'],
//     // args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     headless: false,
//     slowMo: 250
//   });
//   page = await browser.newPage();
//   browser.close();

// })();
  
  

  // const browser = await runner.browser();


  // var Mocha = require('mocha');

  // var mocha = new Mocha();

  // mocha.addFile('test/dmocha1.js');

  // // Run the tests.
  // mocha.run(function(failures){
  //   process.on('exit', function () {
  //     process.exit(failures);  // exit with non-zero status if there were failures
  //   });
  // });

  // browser.close();
  

  

// var Mocha = require('mocha'),
// fs = require('fs'),
// path = require('path');

// // Instantiate a Mocha instance.
// var mocha = new Mocha();

// var testDir = 'some/dir/test'

// // Add each .js file to the mocha instance
// fs.readdirSync(testDir).filter(function(file){
// // Only keep the .js files
// return file.substr(-3) === '.js';

// }).forEach(function(file){
// mocha.addFile(
//     path.join(testDir, file)
// );
// });

// // Run the tests.
// mocha.run(function(failures){
// process.on('exit', function () {
// process.exit(failures);  // exit with non-zero status if there were failures
// });
// });
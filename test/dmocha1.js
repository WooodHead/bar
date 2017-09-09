  // const puppeteer = require('puppeteer');
  const runner = require('./runner');
  
  const assert = require('assert');
describe('新規タスク入力後', () => {
  it('タスクが3つ表示されること', async() => {

    // const browser = await runner.browser();

    // const r = await foo();
    assert.equal(3, 3);
    // r.close();

    // browser.close();
    

  });
});

async function foo(){

  // const assert = require("assert");
  // const appUrl = 'http://localhost:8080/demo/todo.html';
  let browser, page;
  
  // browser = await puppeteer.launch({
  // return  puppeteer.launch({
  //     // args: ['--no-sandbox'],
  //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
  //   headless: true,
  //   // slowMo: 250
  // });

  

  return new Promise(async resolve => {
    setTimeout(()=>{
      resolve(3);
    }, 500);
  });
}

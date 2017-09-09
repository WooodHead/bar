// const puppeteer = require('puppeteer');
// const assert = require("assert");
// const appUrl = 'http://localhost:8080/demo/todo.html';
// let browser, page;




// const EventEmitter = require('events')
// let ev = new EventEmitter();

// puppeteer.launch().then(browser => {
//   browser.newPage().then(page => {
//     ev.emit('browser',page);
//   })
//   // browser.close();
// })


// describe('TODOアプリのテスト', async function(){
//   describe('画面遷移時', () => {

//     before(async function(done){
//       browser = await puppeteer.launch({
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//       });
//       page = await browser.newPage();
//       page.on('console', console.log);
//       done();
//     });


//     it('タスクが2つ表示されていること', async () => {
//       // ev.on('browser', page => {
//         assert.equal(2, 2);
//       // });
//     });
//   });
// });

// function wait() {
//   return new Promise(r => {
//     setTimeout(() => {
//       r();
//     },10000)
//   })
// }





// describe('TODOアプリのテスト', async function(){

//   // before(async function(done){
//   //   browser = await puppeteer.launch({
//   //     args: ['--no-sandbox'],
//   //     // args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   //     headless: false,
//   //     slowMo: 250
//   //   });
//   //   done();
//   // });


//   describe('画面遷移時', () => {
//     it('タスクが2つ表示されていること', async () => {
//       assert.equal(2, 2);
//     });
//   });
// });

// (async function(){
  // browser.close();
// })();







// describe('TODOアプリのテスト', function(){

//   before(async function(done){
//     browser = await puppeteer.launch({
//       args: ['--no-sandbox'],
//       // args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       headless: false,
//       slowMo: 250
//     });
//     page = await browser.newPage();
//     page.on('console', console.log);
//     done();
//   });

//   describe('画面遷移時', () => {

//     before(async function(done){
//       await page.goto(appUrl, {waitUntil: 'networkidle'});
//       done();
//     });

//     it('タスクが2つ表示されていること', async () => {
//       const tasks = await page.$$('.tasks li');
//       assert.equal(tasks.length, 2);
//     });
//   });







////////////////////////////////////////////////

// import test from 'ava'
// import puppeteer from 'puppeteer';

// // 基本形
// test('ava動作確認', t => {
//   t.pass()
// })

// // タイトルはなくてもいい
// test(t => {
//   t.pass()
// })

// test.serial('check form result', async (t) => {
//     const browser = await puppeteer.launch({
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       headless: false,
//     });
//     const page = await browser.newPage();
//     browser.close();
//     t.truthy(1);
// });


////////////////////////////////////////////////



// const puppeteer = require('puppeteer');
// const test = require('ava');
// const appUrl = 'http://localhost:8080/demo/todo.html';


// // test.serial('check form result', async (t) => {
// //     const browser = await puppeteer.launch();
// //     const page = await browser.newPage();

// //     let href;
// //     try {
// //         await page.goto(appUrl, { waitUntil: 'networkidle' });
// //         // await page.focus('input[name=search]');
// //         // await page.type('E2Eテスト');
// //         // await page.click('form input[type=submit]');
// //         // await page.waitForNavigation();
// //         // href = await page.evaluate(() => {
// //         //     return Promise.resolve(document.querySelector('.result a').href);
// //         // });
// //     } catch (e) {
// //         t.fail(e);
// //     }
// //     // const fileName = 'pupetter' + new Date().getTime() + ".png";
// //     // await page.screenshot({ path: fileName });

// //     browser.close();
// //     // console.log(href)
// //     t.truthy(href);
// // });














const runner = require('./runner');
const puppeteer = require('puppeteer');
const assert = require("assert");
const appUrl = 'http://localhost:8080/demo/todo.html';
let browser, page;



describe('TODOアプリのテスト', function(){
  this.timeout(5000);
  
  before(async function(done){
    // this.timeout(5000);
    // browser = await runner();

    // browser = await puppeteer.launch({
    //   args: ['--no-sandbox'],
    //   // args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   headless: false,
    //   slowMo: 250
    // });

    const params = process.env.CI ? {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    } : {
      headless: false,
      slowMo: 250
    };

    browser = await puppeteer.launch(params);
    page = await browser.newPage();
    page.on('console', console.log);
    done();
  });

  describe('画面遷移時', () => {

    before(async function(done){
      // this.timeout(5000);
      await page.goto(appUrl, {waitUntil: 'networkidle'});
      done();
    });

    it('タスクが2つ表示されていること', async () => {
      // this.timeout(5000);
      const tasks = await page.$$('.tasks li');
      assert.equal(tasks.length, 2);
    });
  });
  
  describe('新規タスク入力後', () => {

    const newTaskValue = '勉強するぞ！';

    before(async function(done){
      await page.focus('.newTask');    
      await page.type(newTaskValue);
      await page.click('input[type=submit]');
      done();
    });

    it('タスクが3つ表示されること', async () => {
      const tasks = await page.$$('li');
      assert.equal(tasks.length, 3);
    });

    it('新規タスク入力フィールドが空になっていること', async () => {
      const val = await page.evaluate(() => 
        document.querySelector('.newTask').value
      );
      assert.equal(val, '');
    });

    it('最終行に表示されたタスクが新規入力したタスクと一致すること', async () => {
      const val = await page.evaluate(() => {
        const list = document.querySelectorAll('.tasks li');
        return list.length ? list[list.length-1].innerText : '';
      });
      assert.equal(val, newTaskValue);
    });

  });

  after(async (done) => {
    browser.close();
    done();

  });
  
});



//   // it('aaaaaaaa', async function(){


      
    


//   //   await page.focus('.newTask');    

//   //   // await page.type('ピクセルグリオ');
//   //   await page.type('ピクセルグリオ');
    
//   //   await page.click('input[type=submit]');

//   //   const list = await page.$$('li');

//   //   assert.equal(list.length,222);

    


//   //   // const inputElement = await page.$('form');
//   //   // await inputElement.submit();    

//   //   // await page.press('Return');
//   //   // await page.keyboard.down('Return');
//   //   // await page.keyboard.up('Return');
//   //   // await page.keyboard.sendCharacter('Return')


//   //   // await page.press('return');
//   //   // await page.keyboard.down('return');
//   //   // await page.keyboard.up('return');
//   //   // await page.keyboard.sendCharacter('return')

//   //   // await page.press('Enter1');
//   //   // await page.keyboard.down('Enter');
//   //   // await page.keyboard.up('Enter');
//   //   // await page.keyboard.sendCharacter('Enter')

//   //   // await page.press('enter');
//   //   // await page.keyboard.down('enter');
//   //   // await page.keyboard.up('enter');
//   //   // await page.keyboard.sendCharacter('enter')

    
//   //   browser.close();


//   //   // await page.setRequestInterceptionEnabled(true);
//   //   // page.on('request', interceptedRequest => {
//   //   //   if (interceptedRequest.url.endsWith('.png') || interceptedRequest.url.endsWith('.jpg'))
//   //   //     interceptedRequest.abort();
//   //   //   else
//   //   //     interceptedRequest.continue();
//   //   // });
  


//   //   // await page.goto('http://www.google.com', {waitUntil: 'networkidle'});
//   //   // // await page.goto('http://www.google.com');
//   //   // // Type our query into the search bar
//   //   // await page.type('puppeteer');
//   //   // await page.click('input[type="submit"]');
//   //   // // Wait for the results to show up
//   //   // await page.waitForNavigation();
//   //   // await page.screenshot({path: `puppeteer_${(new Date()).getTime()}.png`});


//   //   // await page.goto('http://localhost:8080/demo/form.html', {waitUntil: 'networkidle'});

//   //   // // await page.waitFor(targetElementSelector)

//   //   // // page.focus('#user-name');    
//   //   // await page.focus('input[name="user-name"]');    
//   //   // // await page.waitFor(1000);
//   //   // await page.type('ピクセルグリオ');
//   //   // // await page.waitFor(1000);

//   //   // let m;
//   //   // page.on('dialog', async dialog => {
//   //   //   // console.log(dialog.message());
//   //   //   // assert.equal(dialog.message(),222);

//   //   //   m = await dialog.message();
      
//   //   //   // m = await dialog.message();
//   //   //   // // await dialog.accept();
//   //   //   // await dialog.dismiss();

//   //   //   // await page.press('Escape');
//   //   //   // await page.press('Enter');
      

//   //   // });





//   //   // await page.click('#submit-button');

//   //   // // await page.waitForNavigation();

//   //   // await page.waitFor(3000);
//   //   // // await page.press('Escape');
    
//   //   // await page.keyboard.down('Tab');
    
//   //   // assert.equal(m,333);
    


//   //   // await page.exposeFunction('md5', text => {
//   //   //   crypto.createHash('md5').update(text).digest('hex')
//   //   // });
//   //   // await page.exposeFunction('assert_equal', assert.equal);
//   //   // await page.exposeFunction('foo', () => {
//   //   //   assert.equal(777,888);
//   //   // });
//   //   // const r = await page.evaluate(async () => {
//   //   //   // const myString = 'PUPPETEER';
//   //   //   // const myHash = await window.md5(myString);
//   //   //   // console.log(`md5 of ${myString} is ${myHash}`);
//   //   //   // window.assert_equal(555,666);
//   //   //   // window.foo();
//   //   //   return 'xxx';
//   //   // });
//   //   // assert.equal(r,222);
    


//   //   // browser.close();
    

//   //   // await puppeteer.launch().then(async browser => {
//   //   //   const page = await browser.newPage();

//   //   //   await page.goto('http://localhost:8080/demo/form.html', {waitUntil: 'networkidle'});
      

//   //   //   // page.on('console', console.log);
//   //   //   await page.exposeFunction('md5', text => {
//   //   //     return crypto.createHash('md5').update(text).digest('hex')
//   //   //   });

//   //   //   await page.evaluate(async () => {
//   //   //     // use window.md5 to compute hashes
//   //   //     const myString = 'PUPPETEER';
//   //   //     const myHash = await window.md5(myString);
//   //   //     // console.log(`md5 of ${myString} is ${myHash}`);

//   //   //     // const myHash2 = await window.foo();
        
        
//   //   //   });


//   //   //   assert.equal(111,222);
      
//   //   //   browser.close();
//   //   // });
  

    


//   // });


  



/////////////////////////////////



// const puppeteer = require('puppeteer');
// const test = require('ava');
// const appUrl = 'http://localhost:8080/demo/todo.html';


// // test.serial('check form result', async (t) => {
// //     const browser = await puppeteer.launch();
// //     const page = await browser.newPage();

// //     let href;
// //     try {
// //         await page.goto(appUrl, { waitUntil: 'networkidle' });
// //         // await page.focus('input[name=search]');
// //         // await page.type('E2Eテスト');
// //         // await page.click('form input[type=submit]');
// //         // await page.waitForNavigation();
// //         // href = await page.evaluate(() => {
// //         //     return Promise.resolve(document.querySelector('.result a').href);
// //         // });
// //     } catch (e) {
// //         t.fail(e);
// //     }
// //     // const fileName = 'pupetter' + new Date().getTime() + ".png";
// //     // await page.screenshot({ path: fileName });

// //     browser.close();
// //     // console.log(href)
// //     t.truthy(href);
// // });




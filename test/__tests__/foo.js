// describe('Counter', () => {
//   describe('increment()', () => {
//     it('should be increment', () => {
//       expect(1).toBe(1)
//     })
//   })
// })

// import puppeteer from 'puppeteer'
const puppeteer = require('puppeteer');


const appUrlBase = 'http://localhost:4000'

let browser
let page

beforeAll(async () => {
  const options ={
    headless: false,
    slowMo: 250 // slow down by 250ms
  }
  browser = await puppeteer.launch(options)
  page = await browser.newPage()
})

describe('Counter', () => {
  describe('increment()', () => {
    it('should be increment', () => {
      expect(1).toBe(1)
    })
  })
})



// test('user sees browser title', async () => {
//   await page.goto(appUrlBase)
//   const browserTitle = await page.title()
//   expect(browserTitle).toBe('ropig')
// })

// test('user is redirected to login when logged out on private routes', async () => {
//   await page.goto(appUrlBase)
//   await page.waitForSelector('[data-testId="userLoginForm"]')
// })

afterAll(async () => {
  browser.close()
})
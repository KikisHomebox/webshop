const puppeteer = require('puppeteer');
require('dotenv').config({ path: './.test.env' });
const URL = process.env.URL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const HOME_TITLE = process.env.HOME_TITLE;
describe('Login and check status', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(URL);
    await page.type('#password', LOGIN_PASSWORD);
    await page.click('body > div > div.content > div:nth-child(2) > form > button');
  });

  afterEach(async () => {
    await browser.close();
  });

  test('Check if webpage returns 200 after login', async () => {
    const response = await page.goto(URL);
    expect(response.status()).toBe(304);
  });

    test('Check if the title is correct', async () => {
        const title = await page.title();
        expect(title).toBe(HOME_TITLE);
    });
});

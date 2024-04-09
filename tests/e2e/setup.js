const puppeteer = require('puppeteer');
require('dotenv').config({ path: './.test.env' });

const URL = process.env.URL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;

let browser;
let page;

async function setup() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(URL);
  await page.type('#password', LOGIN_PASSWORD);
  await page.click('body > div > div.content > div:nth-child(2) > form > button');
  await new Promise(resolve => setTimeout(resolve, 3000));
  return page;
}

async function teardown() {
  await browser.close();
}

module.exports = { setup, teardown};


const { timeout } = require('puppeteer');
const { setup, teardown} = require('./setup');
const puppeteer = require('puppeteer');
require('dotenv').config({ path: './.test.env' });
const URL = process.env.URL;
const HOME_TITLE = process.env.HOME_TITLE;

describe('General Tests', () => {
  let page;
  beforeAll(async () => {
     page = await setup(); 
  });

  afterAll(async () => {
    await teardown();
  });

  test('Check if the status is 304', async () => {
    const response = await page.reload();
    expect(response.status()).toBe(304);
  });

  test('Check if the title is correct', async () => {
    const title = await page.title();
    expect(title).toBe(HOME_TITLE);
  });

  test('Check if the header is visible', async () => {
    const header = await page.$('#shopify-section-sections--14861257474130__header > sticky-header > header');
    expect(header).not.toBeNull();
  });

  test('Check if the search button is visible', async () => {
    const searchButton = await page.$('#shopify-section-sections--14861257474130__header > sticky-header > header > div > details-modal > details > summary > span > svg.modal__toggle-open.icon.icon-search');
    expect(searchButton).not.toBeNull();
  });

  test('Check if the cart button is visible', async () => {
    const cartButton = await page.$('#cart-icon-bubble > svg');
    expect(cartButton).not.toBeNull();
  });

  test('Check if the footer is visible', async () => {
    const footer = await page.$('#shopify-section-sections--14861257441362__footer > footer > div.footer__content-top.page-width');
    expect(footer).not.toBeNull();
  });
  test('Check if the Social Media Icons are visible', async () => {
    const newsletter = await page.$('#shopify-section-sections--14861257441362__footer > footer > div.footer__content-top.page-width > div.footer-block--newsletter.scroll-trigger.animate--slide-in > ul');
    expect(newsletter).not.toBeNull();
  });
  test('Check if the Image Banner is visible', async () => {
    const imageBanner = await page.$('#shopify-section-template--14861256982610__image_banner');
    expect(imageBanner).not.toBeNull();
  }
  );
  test('Check if the 404 page is visible', async () => {
    const response = await page.goto(`${URL}/404`);
    expect(response.status()).toBe(404);
    await page.goto(URL);
  });

});
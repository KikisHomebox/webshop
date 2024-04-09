const { setup, teardown } = require('./setup');
require('dotenv').config({ path: './.test.env' });
const URL = process.env.URL;

describe('Shop Page Tests', () => {
  let page;
  beforeAll(async () => {
     page = await setup(); 
  });

  afterAll(async () => {
    await teardown();
  });

  test('Check if the shop page is visible', async () => {
    const response = await page.goto(`${URL}/collections`);
    expect(response.status()).toBe(200);
  });

  test('Check if the kits are visible', async () => {
    const kits = await page.$('#shopify-section-template--14861257015378__custom_liquid_bAhEkq > div > div > div');
    expect(kits).not.toBeNull();
  });

  test('Check if the add to cart button is visible', async () => {
    const addToCartButton = await page.$('#shopify-section-template--14861257015378__custom_liquid_bAhEkq > div > div > div > a:nth-child(1) > div > div.product-card__info > div > form > button');
    expect(addToCartButton).not.toBeNull();
  });

  test('Check if the extras are visible', async () => {
    const extras = await page.$('#shopify-section-template--14861257015378__custom_liquid_CVihTg > div > div');
    expect(extras).not.toBeNull();
  });
});
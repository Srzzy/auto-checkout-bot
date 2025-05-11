const puppeteer = require('puppeteer');
require('dotenv').config();

async function startCheckout(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto(url);

        console.log("Adding item to cart...");
        await page.waitForSelector('.add-to-cart-button');
        await page.click('.add-to-cart-button');

        console.log("Proceeding to checkout...");
        await page.waitForSelector('.checkout-button');
        await page.click('.checkout-button');

        console.log("Filling in payment information...");
        await page.type('#email', process.env.USER_EMAIL);
        await page.type('#name', process.env.USER_NAME);
        await page.type('#address', process.env.USER_ADDRESS);
        await page.type('#cardNumber', process.env.USER_CARD_NUMBER);
        await page.type('#cvv', process.env.USER_CVV);
        await page.type('#expiry', process.env.USER_EXPIRY);

        await page.click('.submit-order-button');
        console.log("Order submitted!");

    } catch (err) {
        console.log(`Checkout Error: ${err.message}`);
    } finally {
        await browser.close();
    }
}

module.exports = { startCheckout };

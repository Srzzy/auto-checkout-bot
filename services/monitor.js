require('dotenv').config();
const axios = require('axios');
const { startCheckout } = require('./checkout');

const webhookURL = process.env.DISCORD_WEBHOOK_URL;
const checkoutURL = process.env.CHECKOUT_URL;

async function monitorRestock() {
    console.log("Monitoring for restock...");

    try {
        const response = await axios.get(webhookURL);
        const data = response.data;

        if (data.content.includes('restock')) {
            console.log(`Restock detected for ${checkoutURL}`);
            await startCheckout(checkoutURL);
        }
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }

    setTimeout(monitorRestock, 30000); // Re-run every 30 seconds
}

module.exports = { monitorRestock };

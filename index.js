require('dotenv').config();
const { monitorRestock } = require('./services/monitor');

console.log("Starting auto-checkout bot...");
monitorRestock();

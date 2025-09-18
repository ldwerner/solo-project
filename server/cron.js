const cron = require('node-cron');
const Item = require('./models/Item');
const { scrapeItem } = require('./scraper');

async function checkPrices() {
  const items = await Item.find({}).populate('userId'); // All items for all users
  for (const item of items) {
    const { price: newPrice } = await scrapeItem(item.url);
    if (newPrice < item.currentPrice) {
      item.currentPrice = newPrice;
      item.onSale = true;
      item.lastChecked = new Date();
      await item.save();
      console.log(`Sale alert for ${item.title}: $${newPrice}`);
      // Extend: Send email/push to user
    } else {
      item.currentPrice = newPrice;
      item.lastChecked = new Date();
      await item.save();
    }
  }
}

// Run daily at midnight
cron.schedule('0 0 * * *', checkPrices);
console.log('Price checker scheduled daily.');
const puppeteer = require('puppeteer');

async function scrapeItem(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Generic title selector
  const title = await page.evaluate(() => document.querySelector('h1, .product-title')?.innerText || 'Unknown');

  // Fixed price extraction: Native JS to find elements with "$"
  const price = await page.evaluate(() => {
    const elements = document.querySelectorAll('span, div, [class*="price"], [id*="price"]');
    for (let el of elements) {
      const text = el.innerText || el.textContent;
      if (text.includes('$')) {
        const cleanPrice = text.replace(/[^\d.]/g, '');
        if (!isNaN(parseFloat(cleanPrice))) {
          return parseFloat(cleanPrice);
        }
      }
    }
    return 0;
  });

  await browser.close();
  return { title, price: price || 0 };
}

module.exports = { scrapeItem };
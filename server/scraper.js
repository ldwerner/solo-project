const puppeteer = require('puppeteer');

async function scrapeItem(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');  // Avoid bot detection
  await page.goto(url, { waitUntil: 'networkidle2' });

  let title, price, imageUrl;

  // Detect Amazon
  const isAmazon = url.includes('amazon.com');
  if (isAmazon) {
    // Amazon-specific selectors
    title = await page.evaluate(() => document.querySelector('#productTitle')?.innerText?.trim() || 'Unknown');
    price = await page.evaluate(() => {
      const priceEl = document.querySelector('.a-price-whole') || document.querySelector('[data-testid="price"]');
      if (priceEl) {
        const text = priceEl.innerText.replace(/[^\d.]/g, '');
        return parseFloat(text) || 0;
      }
      return 0;
    });
    imageUrl = await page.evaluate(() => document.querySelector('#landingImage')?.src || '');
  } else {
    // Generic fallback
    title = await page.evaluate(() => document.querySelector('h1, .product-title')?.innerText?.trim() || 'Unknown');
    price = await page.evaluate(() => {
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
    imageUrl = await page.evaluate(() => document.querySelector('img[src*="product"], .product-image')?.src || '');
  }

  await browser.close();
  return { title, price: price || 0, imageUrl };
}

module.exports = { scrapeItem };
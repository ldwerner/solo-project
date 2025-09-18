const express = require('express');
const Item = require('../models/Item');
const { scrapeItem } = require('../scraper');
const router = express.Router();

router.post('/add', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { url } = req.body;
    const scraped = await scrapeItem(url);
    const item = new Item({
      userId: req.session.userId,
      url,
      title: scraped.title,
      imageUrl: scraped.imageUrl,  
      initialPrice: scraped.price,
      currentPrice: scraped.price,
      lastChecked: new Date()
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('Scrape error:', err);  // Debug log
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  const items = await Item.find({ userId: req.session.userId }).sort({ lastChecked: -1 });
  res.json(items);
});

router.delete('/:id', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
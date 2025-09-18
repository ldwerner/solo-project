const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  initialPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  lastChecked: { type: Date, default: Date.now },
  onSale: { type: Boolean, default: false }
});

module.exports = mongoose.model('Item', itemSchema);
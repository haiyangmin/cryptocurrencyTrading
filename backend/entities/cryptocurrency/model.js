/**
 * cryptocurrency model
 */
const mongoose = require('mongoose');

const cryptocurrencySchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  cryptocurrencies: [{
    name: { type: String, uppercase: true, trim: true },
    date: { type: Date, default: Date.now },
    price: {
      price: { type: Number },
      priceUnit: { type: String },
    },
    marketCap: { type: Number },
    volume: { type: Number },
    circulatingSupply: { type: Number },
    allTimeHigh: { type: Number },
  }],
});

module.exports = mongoose.model('cryptocurrency', cryptocurrencySchema);

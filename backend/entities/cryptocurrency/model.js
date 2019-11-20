/**
 * cryptocurrency model
 */
const mongoose = require('mongoose');

const cryptocurrencySchema = mongoose.Schema({
  cryptocurrency_id: mongoose.Schema.ObjectId,
  date: { type: Date, default: Date.now },
  cryptocurrencies: {
    bitcoin: {
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
    },
    bitcoinCash: {
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
    },
    ethereum: {
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
    },
    litecoin: {
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
    },
    xrp: {
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
    },
  },
});

module.exports = mongoose.model('cryptocurrency', cryptocurrencySchema);

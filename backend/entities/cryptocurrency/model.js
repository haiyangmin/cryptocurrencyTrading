/**
 * cryptocurrency model
 */
const mongoose = require('mongoose');

const cryptocurrencyConfig = require('../../../config/cryptocurrencyConfig');

const cryptocurrencyMap = {
  BTC: 'bitcoin',
  BCH: 'bitcoinCash',
  ETH: 'ethereum',
  LTC: 'litecoin',
  XRP: 'xrp',
};

const createCryptocurrencies = (cryptocurrencies = []) => {
  let returnObject = {};
  let cryptocurrenciesData = cryptocurrencies.map(() => {
    return {
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
    };
  });
  cryptocurrencies.forEach((name,index) => {
    returnObject[cryptocurrencyMap[name]] = cryptocurrenciesData[index];
  });
  return returnObject;
};

const cryptocurrencySchema = mongoose.Schema({
  cryptocurrency_id: mongoose.Schema.ObjectId,
  date: { type: Date, default: Date.now },
  cryptocurrencies: createCryptocurrencies(cryptocurrencyConfig.cryptocurrencies),
});

module.exports = mongoose.model('cryptocurrency', cryptocurrencySchema);

const axios = require('axios');

const fetchCryptocurrency = (cryptocurrency,priceUnit) => {
  return axios.get('https://min-api.cryptocompare.com/data/price', {
    params: {
      fsym: cryptocurrency,
      tsyms: priceUnit,
    },
  });
};

const cryptocurrencyConfig = require('../config/cryptocurrencyConfig');

const cryptocurrencyMap = {
  BTC: 'bitcoin',
  BCH: 'bitcoinCash',
  ETH: 'ethereum',
  LTC: 'litecoin',
  XRP: 'xrp',
};

const fetchAllCryptocurrencies = (priceUnit = 'EUR') => {
  return axios.all(cryptocurrencyConfig.cryptocurrencies.map((_) => fetchCryptocurrency(_,priceUnit)));
};

const transformFetchedCryptocurrencies = (results = [],priceUnit = 'EUR') => {
  let returnObject = {};
  let transformedData = results.map((_,index) => {
    return {
      name: cryptocurrencyConfig.cryptocurrencies[index],
      price: _.data.EUR,
      priceUnit: priceUnit,
      marketCap: 10000,
      volume: 10000,
      circulatingSupply: 10000,
      allTimeHigh: 1000,
    };
  });
  cryptocurrencyConfig.cryptocurrencies.forEach((_,index) => {
    returnObject[cryptocurrencyMap[_]] = transformedData[index];
  });
  return returnObject;
};

module.exports = {
  fetchCryptocurrency,
  fetchAllCryptocurrencies,
  transformFetchedCryptocurrencies,
};

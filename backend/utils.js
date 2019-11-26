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

const fetchAllCryptocurrencies = (priceUnit = 'EUR') => {
  return axios.all(cryptocurrencyConfig.cryptocurrencies.map((_) => fetchCryptocurrency(_,priceUnit)));
};

const transformFetchedCryptocurrencies = (results = [],priceUnit = 'EUR') => {
  return results.map((_, index) => {
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
};

module.exports = {
  fetchAllCryptocurrencies,
  transformFetchedCryptocurrencies,
};

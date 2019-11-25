const Cryptocurrency = require('./model');

const cryptocurrencyMap = {
  BTC: 'bitcoin',
  BCH: 'bitcoinCash',
  ETH: 'ethereum',
  LTC: 'litecoin',
  XRP: 'xrp',
};

const getAllCryptocurrencyRecord = () => {
  return new Promise((resolve, reject) => {
    Cryptocurrency
    .find({})
    .exec((error, results) => {
      if (error) { console.log(error); reject(error); }
      else if (!results) reject(null);
      else resolve(results);
    });
  });
};


const getLatestCryptocurrencyRecord = () => {
  return new Promise((resolve, reject) => {
    Cryptocurrency
    .findOne()
    .sort({ date: -1 })
    .limit(1)
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) reject(null);
      else resolve(result);
    });
  });
};

const createCryptocurrencies = (cryptocurrencies = {}) => {
  let returnObject = {};
  let cryptocurrenciesData = Object.values(cryptocurrencies).map((value) => {
    return {
      name: value.name,
      date: new Date(),
      price: {
        price: value.price,
        priceUnit: value.priceUnit,
      },
      marketCap: value.marketCap,
      volume: value.volume,
      circulatingSupply: value.circulatingSupply,
      allTimeHigh: value.allTimeHigh,
    };
  });
  Object.keys(cryptocurrencies).forEach((name,index) => {
    returnObject[cryptocurrencyMap[name]] = cryptocurrenciesData[index];
  });
  return returnObject;
};

const createCryptocurrency = (cryptocurrency) => {
  return new Promise((resolve, reject) => {
    const newCryptocurrency = new Cryptocurrency({
      cryptocurrency_id: cryptocurrency.id,
      date: new Date(),
      cryptocurrencies: createCryptocurrencies(cryptocurrency.cryptocurrencies),
    });

    newCryptocurrency.save((error) => {
      if (error) {
        console.log(error);
        reject(error);
      }

      resolve(newCryptocurrency);
    });
  });
};

module.exports = {
  getAllCryptocurrencyRecord,
  getLatestCryptocurrencyRecord,
  createCryptocurrency,
};

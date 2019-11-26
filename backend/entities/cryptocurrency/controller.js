const Cryptocurrency = require('./model');

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

const createCryptocurrency = (cryptocurrencies) => {
  return new Promise((resolve, reject) => {
    const newCryptocurrency = new Cryptocurrency({
      date: new Date(),
    });

    cryptocurrencies.forEach((value) => {
      newCryptocurrency.cryptocurrencies.push(
        {
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
        }
      );
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

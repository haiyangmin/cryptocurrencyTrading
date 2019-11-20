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

const createCryptocurrency = (cryptocurrency) => {
  return new Promise((resolve, reject) => {
    const newCryptocurrency = new Cryptocurrency({
      cryptocurrency_id: cryptocurrency.id,
      date: new Date(),
      cryptocurrencies: {
        bitcoin: {
          name: cryptocurrency.bitcoin.name,
          date: new Date(),
          price: {
            price: cryptocurrency.bitcoin.price,
            priceUnit: cryptocurrency.bitcoin.priceUnit,
          },
          marketCap: cryptocurrency.bitcoin.marketCap,
          volume: cryptocurrency.bitcoin.volume,
          circulatingSupply: cryptocurrency.bitcoin.circulatingSupply,
          allTimeHigh: cryptocurrency.bitcoin.allTimeHigh,
        },
        bitcoinCash: {
          name: cryptocurrency.bitcoinCash.name,
          date: new Date(),
          price: {
            price: cryptocurrency.bitcoinCash.price,
            priceUnit: cryptocurrency.bitcoinCash.priceUnit,
          },
          marketCap: cryptocurrency.bitcoinCash.marketCap,
          volume: cryptocurrency.bitcoinCash.volume,
          circulatingSupply: cryptocurrency.bitcoinCash.circulatingSupply,
          allTimeHigh: cryptocurrency.bitcoinCash.allTimeHigh,
        },
        ethereum: {
          name: cryptocurrency.ethereum.name,
          date: new Date(),
          price: {
            price: cryptocurrency.ethereum.price,
            priceUnit: cryptocurrency.ethereum.priceUnit,
          },
          marketCap: cryptocurrency.ethereum.marketCap,
          volume: cryptocurrency.ethereum.volume,
          circulatingSupply: cryptocurrency.ethereum.circulatingSupply,
          allTimeHigh: cryptocurrency.ethereum.allTimeHigh,
        },
        litecoin: {
          name: cryptocurrency.litecoin.name,
          date: new Date(),
          price: {
            price: cryptocurrency.litecoin.price,
            priceUnit: cryptocurrency.litecoin.priceUnit,
          },
          marketCap: cryptocurrency.litecoin.marketCap,
          volume: cryptocurrency.litecoin.volume,
          circulatingSupply: cryptocurrency.litecoin.circulatingSupply,
          allTimeHigh: cryptocurrency.litecoin.allTimeHigh,
        },
        xrp: {
          name: cryptocurrency.xrp.name,
          date: new Date(),
          price: {
            price: cryptocurrency.xrp.price,
            priceUnit: cryptocurrency.xrp.priceUnit,
          },
          marketCap: cryptocurrency.xrp.marketCap,
          volume: cryptocurrency.xrp.volume,
          circulatingSupply: cryptocurrency.xrp.circulatingSupply,
          allTimeHigh: cryptocurrency.xrp.allTimeHigh,
        },
      },
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

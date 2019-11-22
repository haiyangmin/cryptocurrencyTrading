const getAllCryptocurrencyRecord = require('./controller').getAllCryptocurrencyRecord;
const getLatestCryptocurrencyRecord = require('./controller').getLatestCryptocurrencyRecord;

const cryptocurrencyAPI = (app) => {

  app.get('/api/cryptocurrencies', (req, res) => {
    getAllCryptocurrencyRecord().then(
      (result) => { res.send(result); },
      (error) => { res.send(error); }
    );
  });

  app.get('/api/cryptocurrencies/latest', (req, res) => {
    getLatestCryptocurrencyRecord().then(
      (result) => { res.send(result); },
      (error) => { res.send(error); }
    );
  });
};

module.exports = cryptocurrencyAPI;

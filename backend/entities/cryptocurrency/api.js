const getAllCryptocurrencyRecord = require('./controller').getAllCryptocurrencyRecord;
const getLatestCryptocurrencyRecord = require('./controller').getLatestCryptocurrencyRecord;

const cryptocurrencyAPI = (app) => {

  app.get('/api/cryptocurrency', (req, res) => {
    getAllCryptocurrencyRecord().then(
      (result) => { res.send(result); },
      (error) => { res.send(error); }
    );
  });

  app.get('/api/cryptocurrency/latest', (req, res) => {
    getLatestCryptocurrencyRecord().then(
      (result) => { res.send(result); },
      (error) => { res.send(error); }
    );
  });
  
};

module.exports = cryptocurrencyAPI;

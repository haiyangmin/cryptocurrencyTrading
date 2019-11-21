// modules for server
const path = require('path');
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
// const options = {
//   socketTimeoutMS: 300000,
//   keepAlive: true,
//   reconnectTries: 30000,
// };
const passport = require('passport');

// server configurations
const serverConfigs = require('./config/serverConfig');

const createCryptocurrency = require('./backend/entities/cryptocurrency/controller').createCryptocurrency;

// connect to database
// mongoose.connect(serverConfigs.DBURL,options);


// mongoose.connect(serverConfigs.DBURL,
//   options,function(err){
//     if(err){
//       console.log('Some problem with the connection ' +err);
//     }
//     else {
//       console.log('The Mongoose connection is ready');
//     }
//   });

const options = {
  useMongoClient: true,
  reconnectTries: 1000,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
};

mongoose.connect(serverConfigs.DBURL,options)
 .then(
    () => {
      console.log('connected to mongodb');
      },
    (err) => {
      console.log('some problem with the connection to mongodb' +err);
    }
  );

// initialize express
const app = express();

// apply express configs
require('./backend/express')(app, serverConfigs);

const getBitcoinPrice = axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR');
const getBitcoinCashPrice = axios.get('https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=EUR');
const getEthereumPrice = axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR');
const getLitecoinPrice = axios.get('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=EUR');
const getXRPPrice = axios.get('https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=EUR');

axios.all([getBitcoinPrice,
    getBitcoinCashPrice,
    getEthereumPrice,
    getLitecoinPrice,
    getXRPPrice,
])
.then(
  axios.spread(function (bitcoinPrice, bitcoinCashPrice,ethereumPrice,litecoinPrice,XRPPrice) {
  const cryptocurrency = {
    bitcoin: {
      name: 'BTC',
      price: bitcoinPrice.data.EUR,
      priceUnit: 'EUR',
      marketCap: 10000,
      volume: 10000,
      circulatingSupply: 10000,
      allTimeHigh: 1000,
    },
    bitcoinCash: {
      name: 'BCH',
      price: bitcoinCashPrice.data.EUR,
      priceUnit: 'EUR',
      marketCap: 10000,
      volume: 10000,
      circulatingSupply: 10000,
      allTimeHigh: 1000,
    },
    ethereum: {
      name: 'ETH',
      price: ethereumPrice.data.EUR,
      priceUnit: 'EUR',
      marketCap: 10000,
      volume: 10000,
      circulatingSupply: 10000,
      allTimeHigh: 1000,
    },
    litecoin: {
      name: 'LTC',
      price: litecoinPrice.data.EUR,
      priceUnit: 'EUR',
      marketCap: 10000,
      volume: 10000,
      circulatingSupply: 10000,
      allTimeHigh: 1000,
    },
    xrp: {
      name: 'XRP',
      price: XRPPrice.data.EUR,
      priceUnit: 'EUR',
      marketCap: 10000,
      volume: 10000,
      circulatingSupply: 10000,
      allTimeHigh: 1000,
    },
  };
  createCryptocurrency(cryptocurrency).then(
    (result) => { console.log(result);},
    (error) => { console.log(error);},
  );
}));


// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});

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

const fetchAllCryptocurrencies = require('./backend/utils').fetchAllCryptocurrencies;
const transformFetchedCryptocurrencies = require('./backend/utils').transformFetchedCryptocurrencies;
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

fetchAllCryptocurrencies('EUR')
.then(
  (data) => {
    createCryptocurrency(transformFetchedCryptocurrencies(data)).then(
      (result) => { console.log(result);},
      (error) => { console.log(error);},
    );},
  (error) => console.log(error)
);


// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});

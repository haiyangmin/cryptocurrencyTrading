// modules for server
const path = require('path');
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const passport = require('passport');

// server configurations
const serverConfigs = require('./config/serverConfig');

const fetchAllCryptocurrencies = require('./backend/utils').fetchAllCryptocurrencies;
const transformFetchedCryptocurrencies = require('./backend/utils').transformFetchedCryptocurrencies;
const createCryptocurrency = require('./backend/entities/cryptocurrency/controller').createCryptocurrency;

const options = {
  reconnectTries: 1000,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(serverConfigs.DBURL,options)
 .then(
    () => {
      console.log('connected to mongodb');
      setInterval(function() {
        fetchAllCryptocurrencies('EUR')
          .then(
            (data) => {
              createCryptocurrency(transformFetchedCryptocurrencies(data)).then(
                (result) => { console.log(result);},
                (error) => { console.log(error);},
              );},
            (error) => console.log(error)
          );
      }, 600000);
      },
    (err) => {
      console.log('some problem with the connection to mongodb' +err);
    }
  );

// initialize express
const app = express();

// apply express configs
require('./backend/express')(app, serverConfigs);


// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});

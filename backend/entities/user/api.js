const passport = require('passport');
const getUserByName = require('./controller').getUserByName;
const addCryptocurrenciesToUser = require('./controller').addCryptocurrenciesToUser;
const removeCryptocurrenciesFromUser = require('./controller').removeCryptocurrenciesFromUser;

/**
 * user apis
 */
const userAPI = (app) => {
  // get authenticated user
  app.get('/api/user/getUser', (req, res) => {
    if (req.user) res.send(req.user);
    else res.send(null);
  });

  // github authentication route
  app.get(
    '/api/user/authViaGitHub',
    passport.authenticate('github')
  );

  // callback route from github
  app.get(
    // this should match callback url of github app
    '/api/user/authViaGitHub/callback',
    passport.authenticate('github', { failureRedirect: '/signIn/failed' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  // signout the user
  app.get('/api/user/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


  // get user crytocurrency
  app.get('/api/user/crytocurrency/:username', (req, res) => {
    getUserByName(req.params.username).then(
      result => {
        res.send(result.cryptocurrencies);
      },
      error => {
        res.send({ error });
      }
    );
  });

  // add new cryptocurrency
  app.post('/api/user/add/crytocurrencies/:username', (req, res) => {
    addCryptocurrenciesToUser(req.params.username, req.body.cryptocurrencies.split(',')).then(
      (result) => {
        res.send(result.cryptocurrencies);
      },
      (error) => {
        res.send({ newCryptocurrencyAdded: false });
      }
    );
  });

  // remove cryptocurrency
  app.post('/api/user/remove/crytocurrencies/:username', (req, res) => {
    removeCryptocurrenciesFromUser(req.params.username, req.body.cryptocurrencies.split(',')).then(
      (result) => {
        res.send(result.cryptocurrencies);
      },
      (error) => {
        res.send({ cryptocurrencyRemoved: false });
      }
    );
  });

};

module.exports = userAPI;

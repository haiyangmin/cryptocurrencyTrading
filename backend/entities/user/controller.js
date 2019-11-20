const _ = require('lodash');
const User = require('./model');

const getUser = (user_id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: user_id }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else if (!user) reject(null);
      else resolve(user);
    });
  });
};


const getUserByName = (username) => {
  return new Promise((resolve, reject) => {
    User
    .findOne({ username })
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) reject(null);
      else resolve(result);
    });
  });
};


const addCryptocurrenciesToUser = (username,cryptocurrencies) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else if (!user) reject(null);
      else if (user && Array.isArray(cryptocurrencies)) {
        user.cryptocurrencies = user.cryptocurrencies.concat(cryptocurrencies.filter((_) => user.cryptocurrencies.indexOf(_) < 0));
        user.save((error) => {
          if (error) { console.log(error); reject(error); }
          else { resolve(user); }
        });
      }
    });
  });
};

const removeCryptocurrenciesFromUser = (username,cryptocurrencies) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else if (!user) reject(null);
      else if (user && Array.isArray(cryptocurrencies)) {
        let cryptocurrencyArray = [];
        user.cryptocurrencies.forEach((_) => {
          if (!cryptocurrencies.includes(_)) {
            cryptocurrencyArray.push(_);
          }
        });
        user.cryptocurrencies = cryptocurrencyArray;
        user.save((error) => {
          if (error) { console.log(error); reject(error); }
          else { resolve(user); }
        });
      }
    });
  });
};


const signInViaGithub = (gitProfile) => {
  return new Promise((resolve, reject) => {

    // find if user exist on db
    User.findOne({ username: gitProfile.username }, (error, user) => {
      if (error) { console.log(error); reject(error); }
      else {
        // get the email from emails array of gitProfile
        const email = _.find(gitProfile.emails, { verified: true }).value;

        // user existed on db
        if (user) {
          // update the user with latest git profile info
          user.name = gitProfile.displayName;
          user.username = gitProfile.username;
          user.avatarUrl = gitProfile._json.avatar_url;
          user.email = email;
          user.github.id = gitProfile._json.id,
          user.github.url = gitProfile._json.html_url,
          user.github.company = gitProfile._json.company,
          user.github.location = gitProfile._json.location,
          user.github.hireable = gitProfile._json.hireable,
          user.github.bio = gitProfile._json.bio,
          user.github.followers = gitProfile._json.followers,
          user.github.following = gitProfile._json.following,

          // save the info and resolve the user doc
          user.save((error) => {
            if (error) { console.log(error); reject(error); }
            else { resolve(user); }
          });
        }
        // user doesn't exists on db
        else {
            // create a new user
            const newUser = new User({
              name: gitProfile.displayName,
              username: gitProfile.username,
              avatarUrl: gitProfile._json.avatar_url,
              email: email,
              role: 'user',
              cryptocurrencies: ['bitcoin','bitcoinCash','ethereum','litecoin','xrp'],
              github: {
                id: gitProfile._json.id,
                url: gitProfile._json.html_url,
                company: gitProfile._json.company,
                location: gitProfile._json.location,
                hireable: gitProfile._json.hireable,
                bio: gitProfile._json.bio,
                followers: gitProfile._json.followers,
                following: gitProfile._json.following,
              },
            });

            // save the user and resolve the user doc
            newUser.save((error) => {
              if (error) { console.log(error); reject(error); }
              else { resolve(newUser); }
            });
        }
      }
    });

  });
};


module.exports = {
  signInViaGithub,
  getUser,
  getUserByName,
  addCryptocurrenciesToUser,
  removeCryptocurrenciesFromUser,
};

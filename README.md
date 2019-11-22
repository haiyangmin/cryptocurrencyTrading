# cryptocurrencyTrading
a simple web interface to display the latest data of different cryptocurrency.


application built with the following technologies:
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Webpack](https://webpack.js.org/)
* [ExpressJS](https://expressjs.com/)
* [PassportJS](http://passportjs.org/)
* [MongoDB](https://www.mongodb.com/)

Demo app is deployed on Heroku. Please check it out: 

### Application Features
* User can add cryptocurrencies to database via web form using their codes ("BTC",
  "ETH", "LTC" etc.).
* User can see the list of added currencies together with their EUR prices.
* User can remove the cryptocurrency codes that have been added.
* Backend fetches prices from the API service and stores them in database.
*  Frontend update the prices from backend every 5 minutes when site is open in
  browser.
* User can Sign in via github.

## Run the app locally

Please make sure you have following software installed in your system:
* Node.js > 6.0
* NPM / Yarn
* Git
* MongoDB

First we need to clone the repository:
```
$ git clone https://github.com/haiyangmin/cryptocurrencyTrading.git
```

Then we have to install the necessary dependencies using either NPM or Yarn:
```
$ npm i
```
```
$ yarn
```

Since the app currently uses GitHub authentication, we need to configure a GitHub OAuth application. You can register a new application from this link https://github.com/settings/developers

We need to grab the following information from the OAuth application.
* Client ID
* Client Secret
* Callback URL

The `Callback URL` is the domain where GitHub will redirect the user after a successful login. You can use a domain name or local host. But we need to append the URL with the path `/api/user/authViaGitHub/callback`. So, the complete url will look like:
`https://localhost:8080/api/user/authViaGitHub/callback`

Now, we need to configure the credentials inside of the codebase. Open the file `config/credentials.js` add the necessary information. The file looks like this:
```js
module.exports = {
  GITHUB_CLIENT_ID: '',
  GITHUB_CLIENT_SECRET: '',
  GITHUB_CALLBACK_URL: '',
  DBURL: '',
};
```

We need to provide all the information here. You can notice that we need the database url here too. My `local` MongoDB url looks like:
```
mongodb://localhost:27017/cryptocurrency
```

Now we are ready to run the application. You can run either run the development environment of the application which will include Hot-Reload for JS codes using Webpack and the Redux dev tool extension, or you can run the production edition. The default port for developer edition is `8080`, and for production is `process.env.PORT`.

To run the app in development environment:
```
$ npm run start:dev
```

To run the app in production environment:
```
$ npm run start
```

Now, if you visit [http://localhost:8080](http://localhost:8080) (if you ran the dev), or the production URL, you will see that the application is up and running.
Congratulation! You now have a clone of this application in your server.

## Path for Future Work
* Add the possibility to show the price in a chart. user can view the price in the chart in a selected period.


## Conclusion
The application is created for a test assignment.


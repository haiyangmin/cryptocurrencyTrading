import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Table from './Table';
import { getLatestCryptocurrency, addCryptocurrencyToUser } from '../../App/actions';
import appLayout from 'SharedStyles/appLayout';
import styles from './styles.css';

const mockData = [
  {
    name: 'BTC',
    price: 1000,
    marketCap: 199,
    volume: 1000,
    circulatingSupply: 888,
    allTimeHigh: 888,
  },
  {
    name: 'BTC',
    price: 1000,
    marketCap: 199,
    volume: 1000,
    circulatingSupply: 888,
    allTimeHigh: 888,
  },
  {
    name: 'BTC',
    price: 1000,
    marketCap: 199,
    volume: 1000,
    circulatingSupply: 888,
    allTimeHigh: 888,
  },
  {
    name: 'BTC',
    price: 1000,
    marketCap: 199,
    volume: 1000,
    circulatingSupply: 888,
    allTimeHigh: 888,
  },
  {
    name: 'BTC',
    price: 1000,
    marketCap: 199,
    volume: 1000,
    circulatingSupply: 888,
    allTimeHigh: 888,
  },
];

class CryptocurrencyDisplay extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      getLatestCryptocurrency,
    } = this.props;

    // get latest cryptocurrency price
    getLatestCryptocurrency();

  }

  render() {

    console.log(this.props)
    console.log(this.prop)

    const {
      cryptocurrencies,
      fetchingCryptocurrencies,
      appError,
    } = this.props.app;

    const {
      userCryptocurrencies,
      fetchingUser,
      updatingUserCryptocurrecy,
      error,
    } = this.props.user;

    if (error || appError) {
      return (
        <div className={classnames(styles.errorMsg)}>
          {error}
        </div>
      );
    }

    function getCryptocurrencyDataByUser(cryptocurrencies,userCryptocurrencies){
      let userCryptocurrenciesData = [];
      userCryptocurrencies.forEach((_) => {
        userCryptocurrenciesData.push(cryptocurrencies[_]);
      });
      userCryptocurrenciesData.forEach((item) => {
        item.price = item.price.price + item.price.priceUnit;
      });
      return userCryptocurrenciesData;
    }

    if (fetchingCryptocurrencies || fetchingUser) {
      return (
        <div className={styles.loadingWrapper}>Loading...</div>
      );
    }

    if (updatingUserCryptocurrecy) {
      return (
        <div className={styles.loadingWrapper}>Please wait...</div>
      );
    }

    if (!fetchingCryptocurrencies) {
      const cryptocurrencies = getCryptocurrencyDataByUser(this.props.app.cryptocurrencies,userCryptocurrencies);
      return (
        <div className={classnames(appLayout.constraintWidth, styles.contentArea)}>
          <div className={appLayout.primaryContent}>
            <Table
              cryptoCurrencies={cryptocurrencies}
              // cryptoCurrencies={mockData}
            />
          </div>
        </div>
      );
    }

  }
}

export default connect(
  (state) => { return {
    app: state.app,
    user: state.user,
  }; },
  (dispatch) => { return {
    addCryptocurrencyToUser: (username,cryptocurrencies) => { dispatch(addCryptocurrencyToUser(username,cryptocurrencies)); },
    getLatestCryptocurrency: () => { dispatch(getLatestCryptocurrency()); },
  };}
)(CryptocurrencyDisplay);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import CryptocurrencyDisplay from 'Containers/CryptocurrencyDisplay';

import { getUser, getLatestCryptocurrency } from './actions';

class AppContainer extends Component {
  // componentDidMount() {
  //   const {
  //     getUser,
  //     getLatestCryptocurrency,
  //   } = this.props;
  //
  //   getUser();
  //   getLatestCryptocurrency();
  // }

  // componentDidUpdate() {
  //   const {
  //     getUser,
  //     getLatestCryptocurrency,
  //   } = this.props;
  //
  //   getUser();
  //   getLatestCryptocurrency();
  // }


  render() {
    return (
      <div>
        <Helmet><title>Cryptocurrency Price</title></Helmet>
        <Header />
        <CryptocurrencyDisplay />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    app: state.app,
    user: state.user,
  }; },
  (dispatch) => { return {
    getUser: () => { dispatch(getUser()); },
    getLatestCryptocurrency: () => { dispatch(getLatestCryptocurrency()); },
  };}
)(AppContainer);

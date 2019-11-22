import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import CryptocurrencyDisplay from 'Containers/CryptocurrencyDisplay';

import { getUser } from './actions';

class AppContainer extends Component {
  componentDidMount() {
    // check for authenticated user
    this.props.getUser();

    this.interval = setInterval(() => {
      this.props.getUser();
    }, 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Helmet><title>Cryptocurrency Price</title></Helmet>
        <Header />
        <CryptocurrencyDisplay />
        <Footer />
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    user: state.user,
  }; },
  (dispatch) => { return {
    getUser: () => { dispatch(getUser()); },
  }; }
)(AppContainer);

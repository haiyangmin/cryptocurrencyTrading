import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import CryptocurrencyDisplay from 'Containers/CryptocurrencyDisplay';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

import { getUser } from './actions';

class AppContainer extends Component {
  componentDidMount() {
    const {
      getUser,
    } = this.props;

    // check for authenticated user
    getUser();

  }

  componentDidUpdate() {

  }

  render() {
    const { username } = this.props;

    // render only if we get the user
    if (username) {
      return (
        <div>
          <Helmet><title>Cryptocurrency Price</title></Helmet>
          <Header />
          <CryptocurrencyDisplay />
          {/*{this.props.children}*/}
          <Footer />
        </div>
      );
    }

    else {
      return (
        <div>
          <Helmet><title>Cryptocurrency Price</title></Helmet>
          <Header />
          <div className={styles.loadingWrapper}>Please sign in...</div>
          <Footer />
        </div>
      );
    }
  }
}

export default connect(
  (state) => { return {
    username: state.user.username,
  }; },
  (dispatch) => { return {
    getUser: () => { dispatch(getUser()); },
  }; }
)(AppContainer);

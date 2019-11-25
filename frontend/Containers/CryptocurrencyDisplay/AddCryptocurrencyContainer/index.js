import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { updateUserCryptocurrencies } from '../../../App/actions';
const cryptocurrencyConfig = require('../../../../config/cryptocurrencyConfig');

class AddCryptocurrencyContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getUnaddedCryptocurrency(userCryptocurrencies) {
    return cryptocurrencyConfig.cryptocurrencies.filter((_) => !userCryptocurrencies.includes(_)).toString();
  }


  render() {
    const {
      username,
      userCryptocurrencies,
    } = this.props.user;


    const unAddedCryptocurrencies = this.getUnaddedCryptocurrency(userCryptocurrencies);

    console.log(unAddedCryptocurrencies);

    let input;

    return (
      <div>
        <p>you can add cryptocurrency [ {unAddedCryptocurrencies} ]</p>
        <form onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          this.props.updateUserCryptocurrencies(username,input.value);
          input.value = '';
        }}>
          <input ref={node => input = node} />
          <button type="submit">
            Add cryptocurrency
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    user: state.user,
  }; },
  (dispatch) => { return {
    updateUserCryptocurrencies: (username,cryptocurrencies) => { dispatch(updateUserCryptocurrencies(username,cryptocurrencies)); },
  };}
)(AddCryptocurrencyContainer);

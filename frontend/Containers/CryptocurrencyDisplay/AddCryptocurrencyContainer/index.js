import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { addCryptocurrencyToUser } from '../../../App/actions';

class AddCryptocurrencyContainer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      addCryptocurrencyToUser,
    } = this.props;

    const {
      username,
      userCryptocurrencies,
    } = this.props.user;

    function getUnaddedCryptocurrency(userCryptocurrencies) {
      return ['bitcoin','bitcoinCash','ethereum','litecoin','xrp'].filter((_) => !userCryptocurrencies.includes(_)).toString();
    }

    let unAddedCryptocurrencies = getUnaddedCryptocurrency(userCryptocurrencies);

    let input;

    return (
      <div>
        <p>`you can add cryptocurrency ${unAddedCryptocurrencies}`</p>
        <form onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          addCryptocurrencyToUser(username,input.value);
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
    addCryptocurrencyToUser: (username,crytocurrencies) => { dispatch(addCryptocurrencyToUser(username,crytocurrencies)); },
  };}
)(AddCryptocurrencyContainer);

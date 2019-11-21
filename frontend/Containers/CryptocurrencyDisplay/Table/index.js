import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { removeCryptocurrencyFromUser } from '../../../App/actions';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      removeCryptocurrencyFromUser,
      cryptoCurrencies,
    } = this.props;

    const {
      username,
    } = this.props.user;

    function renderResultRows(data, removeCryptocurrencyFromUser,username) {
      return data.map((data, index) => {
        return (
          <tr className={ styles.tr } key={ index }>
            <td className={ styles.td }>{ data.name }</td>
            <td>{ data.price }</td>
            <td>{ data.marketCap }</td>
            <td>{ data.volume }</td>
            <td>{ data.circulatingSupply }</td>
            <td>{ data.allTimeHigh }</td>
            <td>
              <button onClick={ props.removeCryptocurrencyFromUser(username, data.name) }>
                Remove
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <table className={ styles.table }>
          <thead className={ styles.thead }>
          <tr className={ styles.tr }>
            <th>Name</th>
            <th>Price</th>
            <th>MarketCap</th>
            <th>Volume</th>
            <th>CirculatingSupply</th>
            <th>AllTimeHigh</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          { renderResultRows(cryptoCurrencies,removeCryptocurrencyFromUser,username) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    user: state.user,
  }; },
  (dispatch) => { return {
    removeCryptocurrencyFromUser: (username,cryptocurrencies) => { dispatch(removeCryptocurrencyFromUser(username,cryptocurrencies)); },
  }; }
)(Table);





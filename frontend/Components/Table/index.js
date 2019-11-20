import React, { Component } from 'react';
import styles from './styles';

class Row extends Component {
    render() {
      return (
        <tr className={ styles.tr }>
          <td className={ styles.td }>{this.props.cryptoCurrency.name}</td>
          <td>{this.props.cryptoCurrency.price}</td>
          <td>{this.props.cryptoCurrency.marketCap}</td>
          <td>{this.props.cryptoCurrency.volume}</td>
          <td>{this.props.cryptoCurrency.circulatingSupply}</td>
          <td>{this.props.cryptoCurrency.allTimeHigh}</td>
          <td>
            <input type="button" value="X"/>
          </td>
        </tr>
      );
    }
  }

class Table extends Component {
    render() {
      let rows = [];
      this.props.cryptoCurrencies.forEach((cryptoCurrency) => {
        rows.push(<Row cryptoCurrency={cryptoCurrency} />);
      });
      return (
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
          <tbody className={ styles.tbody }>{rows}</tbody>
        </table>
      );
    }
  }

export default Table;

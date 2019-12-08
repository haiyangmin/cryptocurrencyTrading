import React from "react";
import { Grid } from "@material-ui/core";
import { connect } from 'react-redux';
import styles from './styles';
import { updateUserCryptocurrencies } from '../../../App/actions';

export default function Table(props) {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Cryptocurrency price" upperTitle noBodyPadding>
            <Table data={props.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  getCryptocurrencyDataByUser(cryptocurrencies,userCryptocurrencies){
    const clonedCryptocurrencies =  JSON.parse(JSON.stringify(cryptocurrencies));
    let userCryptocurrenciesData = [];
    userCryptocurrencies.forEach((_) => {
      clonedCryptocurrencies.forEach((item,index) => {
        if (_ === item.name) {
          userCryptocurrenciesData.push(clonedCryptocurrencies[index]);
        }
      });
    });
    userCryptocurrenciesData.forEach((item) => {
      if (item.price instanceof Object) {
        item.price = `${item.price.price} ${item.price.priceUnit}`;
      }
      else {
        return;
      }
    });
    return userCryptocurrenciesData;
  }

  renderResultRows(data, updateUserCryptocurrencies,username) {
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
            <button onClick={e => {
              e.preventDefault();
              updateUserCryptocurrencies(username,data.name);
            }}>
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.props);

    const {
      username,
      userCryptocurrencies,
    } = this.props.user;

    const userCryptocurrenciesData = this.getCryptocurrencyDataByUser(this.props.app.cryptocurrencies,userCryptocurrencies);

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
          { this.renderResultRows(userCryptocurrenciesData,this.props.updateUserCryptocurrencies,username) }
          </tbody>
        </table>
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
    updateUserCryptocurrencies: (username,cryptocurrencies) => { dispatch(updateUserCryptocurrencies(username,cryptocurrencies)); },
  }; }
)(Table);





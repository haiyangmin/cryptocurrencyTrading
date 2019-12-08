import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import classnames from 'classnames';
import Table from './Table';
import AddCryptocurrencyContainer from './AddCryptocurrencyContainer';
import appLayout from 'SharedStyles/appLayout';
import styles from './styles.css';

export default function CryptocurrencyDisplay() {
  return (
    <div>
      <Helmet><title>Cryptocurrency Price</title></Helmet>
      <Header />
       <div className={classnames(appLayout.constraintWidth, styles.contentArea)}>
        <div className={appLayout.primaryContent}>
          <Table/>
          <AddCryptocurrencyContainer />
        </div>
       </div>
    </div>
  );
}


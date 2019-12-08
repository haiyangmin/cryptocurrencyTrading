import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Themes from 'Themes/index';
import { UserProvider } from 'Context/UserContext';

import AppContainer from './App';

ReactDOM.render(
  <UserProvider>
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <AppContainer />
    </ThemeProvider>
  </UserProvider>,
  document.getElementById('root')
);

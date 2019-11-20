import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import styles from './styles';

// app store
import appStore from './store';

// app views
import AppContainer from './App';
import UserProfile from '../Views/UserProfile';
import NotFound from '../Views/NotFound';

ReactDOM.render(
  <Provider store={ appStore }>
    <Router history={ browserHistory }>
      <Route path="/" component={ AppContainer }>
        <Route path="user/:username" component={ UserProfile }/>
        <Route path="*" component={ NotFound }/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import CryptocurrencyDisplay from 'Containers/CryptocurrencyDisplay';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Error from 'Views/Error';
import Login from 'Views/Login';

// Context
import { useUserState } from '../Context/UserContext';

export default function AppContainer() {
  // global
  let { isAuthenticated } = useUserState();

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={CryptocurrencyDisplay} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );


  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}


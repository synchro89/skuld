import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

import Home from '@/pages/Home';

import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <PrivateRoute path="/" component={Home} />
      <PublicRoute path="/login" component={Home} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;

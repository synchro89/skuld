import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';

import Layout from '@/components/Layout';

import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <PrivateRoute path="/" exact component={PrivateRoutes} />
      <PublicRoute path="/login" exact component={PublicRoutes} />
    </Switch>
  </ConnectedRouter>
);

const PrivateRoutes = () => (
  <>
    <Layout>
      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
      </Switch>
    </Layout>
  </>
);

const PublicRoutes = () => (
  <>
    <Switch>
      <PublicRoute path="/login" exact component={Login} />
    </Switch>
  </>
);

export default Routes;

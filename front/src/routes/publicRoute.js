import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

function PublicRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
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

export default PublicRoute;

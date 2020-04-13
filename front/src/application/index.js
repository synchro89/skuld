import React, { useEffect } from 'react';

import { UserTypes } from '../store/ducks/user';
import { useDispatch, useSelector } from 'react-redux';

function Application({ children }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // To load initial user data
  useEffect(() => {
    if (user.isAuth !== null) return;

    dispatch({
      type: UserTypes.GET_USER_REQUEST,
    });
  }, []);

  if (user.isAuth === null)
    return (
      <div
        style={{
          background: 'blue',
          padding: '2rem',
          color: 'white',
        }}
      >
        LOADING
      </div>
    );

  return children;
}
export default Application;

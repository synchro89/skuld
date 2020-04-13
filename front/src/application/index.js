import React, { useEffect } from 'react';

import { UserTypes } from '../store/ducks/user';
import { useDispatch, useSelector } from 'react-redux';

import storage from '@/utils/storage';

function Application({ children }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // To load initial user data
  useEffect(() => {
    function getUser() {
      if (user.isAuth !== null) return;

      if (!storage.haveToken()) {
        return dispatch({
          type: UserTypes.GET_USER_SUCCESS,
          payload: {
            data: null,
          },
        });
      }

      dispatch({
        type: UserTypes.GET_USER_REQUEST,
      });
    }

    getUser();
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

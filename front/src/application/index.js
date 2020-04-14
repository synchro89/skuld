import React, { useEffect } from 'react';

import { UserTypes } from '../store/ducks/user';
import { useDispatch, useSelector } from 'react-redux';

import storage from '@/utils/storage';

function Application({ children }) {
  const user = useSelector((state) => state.user);

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

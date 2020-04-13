import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as user } from './user';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
  });

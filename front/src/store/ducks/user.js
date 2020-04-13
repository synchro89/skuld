import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getUserRequest: [],
  getUserSuccess: ['data'],
  getUserFailure: [],
});

export const UserTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  loading: null,
  data: null,
  error: null,
  isAuth: null
});

/* Reducers */

const getUserRequest = (state) => state.merge({
  ...state,
  loading: true,
});

const getUserSuccess = (state, { data }) => state.merge({
  data,
  loading: false,
  error: false,
});

const getUserFailure = (state) => state.merge({
  ...state,
  error: true,
  loading: false,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,
});

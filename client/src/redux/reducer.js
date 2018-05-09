import { combineReducers } from 'redux';

import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_LOGOUT } from './actions';

export const initialState = {
  requestPending: false,
  text: null,
  error: false,
  authenticated: false
};

export const loginStatus = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOGIN_PENDING:
      return {
        ...state,
        requestPending: action.isLoginPending,
        text: 'Please wait...',
        error: false,
        authenticated: false
      };

    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        requestPending: false,
        text: 'Success',
        error: false,
        authenticated: true
      };

    case SET_LOGIN_ERROR:
      return {
        ...state,
        requestPending: false,
        text: action.loginError.message,
        error: true,
        authenticated: false
      };

    case SET_LOGOUT:
      return {
        ...state,
        text: '',
        authenticated: false
      };

    default:
      return state;
  }
};

const loginApp = combineReducers({
  loginStatus
});

export default loginApp;

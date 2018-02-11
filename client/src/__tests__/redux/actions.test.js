import {
  SET_LOGIN_PENDING,
  setLoginPending,
  SET_LOGIN_SUCCESS,
  setLoginSuccess,
  SET_LOGIN_ERROR,
  setLoginError,
  SET_LOGOUT,
  setLogout,
  logout,
  login
} from '../../redux/actions';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test login', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('dispatches correct actions for successful login', () => {
    const fakeValues = {
      email: 'test@test.com',
      password: 'test'
    }

    fetchMock
      .post('/api/login', { body: { success: true }, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: SET_LOGIN_PENDING, isLoginPending: true },
      { type: SET_LOGIN_PENDING, isLoginPending: false },
      { type: SET_LOGIN_SUCCESS, isLoginSuccess: true }
    ];
    const store = mockStore({});

    return store.dispatch(login(fakeValues)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches correct actions for unsuccessful login', () => {
    const fakeValues = {
      email: 'test@test.com',
      password: 'test'
    }

    const fakeErrorMessage = "Login failed",
      fakeError = new Error(fakeErrorMessage);

    fetchMock
      .post('/api/login', { body: { message: fakeErrorMessage }, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: SET_LOGIN_PENDING, isLoginPending: true },
      { type: SET_LOGIN_PENDING, isLoginPending: false },
      { type: SET_LOGIN_ERROR,  loginError: fakeError}
    ];
    const store = mockStore({});

    return store.dispatch(login(fakeValues)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches correct actions when login server is unavailable', () => {
    const fakeValues = {
      email: 'test@test.com',
      password: 'test'
    }

    const fakeErrorMessage = "Could not contact login server",
      fakeError = new Error(fakeErrorMessage);

    fetchMock
      .post('/api/login', 500);

    const expectedActions = [
      { type: SET_LOGIN_PENDING, isLoginPending: true },
      { type: SET_LOGIN_PENDING, isLoginPending: false },
      { type: SET_LOGIN_ERROR,  loginError: fakeError}
    ];
    const store = mockStore({});

    return store.dispatch(login(fakeValues)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Test logout', () => {

  it('dispatches correct actions for logout', () => {

    const expectedActions = {
      type: SET_LOGOUT
    };

    const store = mockStore({});
    const result = store.dispatch(logout());

    expect(result).toEqual(expectedActions);
  });
});

describe('Test setLoginPending', () => {

  it('Returns correct action type and true', () => {

    const result = setLoginPending(true);

    expect(result).toEqual({
      type: SET_LOGIN_PENDING,
      isLoginPending: true
    });
  });

  it('Returns correct action type and false', () => {

    const result = setLoginPending(false);

    expect(result).toEqual({
      type: SET_LOGIN_PENDING,
      isLoginPending: false
    });
  });
});

describe('Test setLoginSuccess', () => {

  it('Returns correct action type and true', () => {

    const result = setLoginSuccess(true);

    expect(result).toEqual({
      type: SET_LOGIN_SUCCESS,
      isLoginSuccess: true
    });
  });

  it('Returns correct action type and false', () => {

    const result = setLoginSuccess(false);

    expect(result).toEqual({
      type: SET_LOGIN_SUCCESS,
      isLoginSuccess: false
    });
  });
});

describe('Test setLoginError', () => {

  it('Returns correct action type and error', () => {

    const fakeError = {
      message: 'An error has happened'
    };

    const result = setLoginError(fakeError);

    expect(result).toEqual({
      type: SET_LOGIN_ERROR,
      loginError: fakeError
    });
  });
});

describe('Test setLogout', () => {

  it('Returns correct action type', () => {

    const result = setLogout();

    expect(result).toEqual({
      type: SET_LOGOUT
    });
  });
});

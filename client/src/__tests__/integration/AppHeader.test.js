import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ReactWrapper, mount } from 'enzyme';

import loginStatus from '../../redux/reducer';
import AppHeader from '../../containers/AppHeader';

/* Sets up basic variables to be used by integration tests
 * Params:
 *   reducers: should be an object with all the reducers your page uses
 *   initialRouterState: an optional object to set as the initial state for the router
 * Returns:
 *   an object with the following attributes:
 *     store: the reducer store which contains the main dispatcher and the state
 *     dispatchSpy: a jest spy function to be used on assertions of dispatch action calls
 */
export function setupIntegrationTest(reducers, initialState = {}) {

  // creating a jest mock function to serve as a dispatch spy for asserting dispatch actions if needed
  const dispatchSpy = jest.fn(() => ({}));
  const reducerSpy = (state, action) => dispatchSpy(action);
  const initalState = {
    loginStatus: {
      authenticated: true
    }
  };

  // applying thunk middleware to the the store
  const combinedReducers = combineReducers({
    reducerSpy,
    loginStatus: reducers
  });
  const store = createStore(
    reducers,
    initalState,
    applyMiddleware(thunk)
  );

  return { store, dispatchSpy };
}

describe('AppHeader Component integration tests', () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {

    ({ store, dispatchSpy } = setupIntegrationTest(loginStatus, {}));
  });

  it('should mount', () => {

    const appHeader = mount(
      <Provider store={store}>
        <AppHeader />
      </Provider>
    );

    const menuButton = appHeader.find('button.menuButton');

    expect((menuButton).text()).toEqual('Logout');

    menuButton.simulate('click');

    expect((menuButton).text()).toEqual('Login');
    //expect(dispatchSpy).toBeCalledWith({ type: 'SET_LOGOUT' });
  });

});

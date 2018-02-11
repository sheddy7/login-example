import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import AppHeader from '../../containers/AppHeader';

describe('Connected AppHeader container', () => {
  const initalState = {
    loginStatus: {
      authenticated: false
    }
  };

  const mockStore = configureMockStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initalState);
    container = shallow(<AppHeader store={store} />);
  });

  it('renders the container', () => {
    expect(container.length).toEqual(1);
  });
});

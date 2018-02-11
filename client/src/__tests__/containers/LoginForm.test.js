import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import LoginForm from '../../containers/LoginForm';

describe('Connected Login container', () => {
  const initalState = {
    loginStatus: {
      text: null,
      error: false,
    }
  };

  const mockStore = configureMockStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initalState);
    container = shallow(<LoginForm store={store} />);
  });

  it('renders the container', () => {
    expect(container.length).toEqual(1);
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';

import AppHeaderComponent from '../../components/AppHeaderComponent';

describe('<AppHeaderComponent />', () => {
  it('renders without crashing', () => {
    const component = shallow(<AppHeaderComponent/>);

    expect(component).toMatchSnapshot();
  });

  it('shows Welcome text if autenticated prop is true', () => {

    const component = mount(
        <AppHeaderComponent
          authenticated={true}
        />
    );

    const menuButton = component.find('button.menuButton');

    expect((menuButton).text()).toEqual('Logout');
  });

  it('shows Login text if autenticated prop is false', () => {

    const component = mount(
        <AppHeaderComponent
          authenticated={false}
        />
    );

    const menuButton = component.find('button.menuButton');

    expect((menuButton).text()).toEqual('Login');
  });
});

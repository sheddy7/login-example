import React from 'react';
import { mount, shallow } from 'enzyme';

import LoginFormComponent from '../../components/LoginFormComponent';

describe('<LoginFormComponent />', () => {
  it('renders without crashing', () => {
    const component = shallow(<LoginFormComponent/>);

    expect(component).toMatchSnapshot();
  });

  it('Submit works', () => {
    const testValues = {
        handleSubmit: jest.fn(),
    };

    const component = mount(
        <LoginFormComponent {...testValues} />
    );

    component.find('#submitButton').simulate('submit');
    expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('email, password props are shown in text fields', () => {
    const testValues = {
        email: 'test@test.com',
        password: 'test'
    };

    const component = mount(
        <LoginFormComponent {...testValues} />
    );

    const emailInput = component.find('input[name="email"]'),
      passwordInput = component.find('input[name="password"]');

    expect(emailInput).toHaveLength(1);
    expect((emailInput).props().value).toEqual(testValues.email);
    expect(passwordInput).toHaveLength(1);
    expect((passwordInput).props().value).toEqual(testValues.password);
  });

  it('passing text renders as a message without error class', () => {
    const testValues = {
      text: 'this is some text',
      error: false
    };

    const component = shallow(
      <LoginFormComponent {...testValues} />
    );

    const messageDiv = component.find('div.message');

    expect(messageDiv).toHaveLength(1);
    expect((messageDiv).text()).toEqual(testValues.text);
    expect((messageDiv).hasClass('error')).toEqual(false);
  });

  it('passing error renders as a message with error class', () => {
    const testValues = {
      text: 'something went wrong',
      error: true
    };

    const component = shallow(
      <LoginFormComponent {...testValues} />
    );

    const messageDiv = component.find('div.message');

    expect(messageDiv).toHaveLength(1);
    expect((messageDiv).text()).toEqual(testValues.text);
    expect((messageDiv).hasClass('error')).toEqual(true);
  });

  it('Updating text calls handleFieldChange', () => {
    const testValues = {
        handleFieldChange: jest.fn(),
    };

    const component = mount(
        <LoginFormComponent {...testValues} />
    );

    const emailInput = component.find('input[name="email"]'),
      passwordInput = component.find('input[name="password"]');

    emailInput.simulate('change', { target: { value: 'test@test.com' } });
    expect(testValues.handleFieldChange).toHaveBeenCalledTimes(1);

    passwordInput.simulate('change', { target: { value: 'password' } });
    expect(testValues.handleFieldChange).toHaveBeenCalledTimes(2);
  });

});

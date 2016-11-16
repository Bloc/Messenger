import React from 'react';
import ReactNative, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import Login from './index.js';

describe('<Login />', () => {
  it('should render text for Login', () => {
    const component = shallow(<Login />);
    const text = component.find(Text).node.props.children;
    expect(text).toBe(' Login using your Bloc.io email and password');
  });

  it('populates email field', () => {
    const component = shallow(<Login />);
    component.setState({email: 'bill@mail.com'});
    expect(component.contains(<TextInput value='bill@email.com' />));
  });

  it('populates password field', () => {
    const component = shallow(<Login />);
    component.setState({password: 'top_secret'});
    expect(component.contains(<TextInput value='top_secret' />));
  });

  it('form renders 2nd text for error when submited without info', () => {
    const component = shallow(<Login />);
    button = component.find(TouchableHighlight);
    button.simulate('click');

    const text = component.find(Text);
    expect(text.length).toBe(2);
  });
});

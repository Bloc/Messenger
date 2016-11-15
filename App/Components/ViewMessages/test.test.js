import React from 'react';
import ReactNative, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import ViewMessages from './index.js';
import {expect} from 'chai';

describe('<ViewMessages />', () => {
  it('should render ViewMessages component', () => {
    const component = shallow(<ViewMessages />);
    expect(component).toBeDefined;
  });
});


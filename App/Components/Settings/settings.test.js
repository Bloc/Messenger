import React from 'react';
import ReactNative, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import Settings from './index.js';

describe('<Settings />', () => {
  it('should render Settings component', () => {
    const component = shallow(<Settings />);
    expect(component).toBeDefined;
  });
});



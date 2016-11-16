import React from 'react';
import ReactNative, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import Main from './index.js';

describe('<Main />', () => {
  it('should render Main component', () => {
    const component = shallow(<Main />);
    expect(component).toBeDefined;
  });
});



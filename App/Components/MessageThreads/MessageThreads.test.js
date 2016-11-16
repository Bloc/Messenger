import React from 'react';
import ReactNative, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import MessageThreads from './index.js';

describe('<MessageThreads />', () => {
  it('should render MessageThreads component', () => {
    const component = shallow(<MessageThreads />);
    expect(component).toBeDefined;
  });
});



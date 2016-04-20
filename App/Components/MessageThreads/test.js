import React, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import MessageThreads from './index.js';
import {expect} from 'chai';

describe('<MessageThreads />', () => {
  it('should render MessageThreads component', () => {
    const component = shallow(<MessageThreads />);
    expect(component).to.exists
  });
});



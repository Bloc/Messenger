import React, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import ViewMessages from '../ViewMessages';
import {expect} from 'chai';

describe('<ViewMessages />', () => {
  it('should render ViewMessages component', () => {
    const component = shallow(<ViewMessages />);
    expect(component).to.exists
  });
});


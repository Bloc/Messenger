import React, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import Settings from '../Settings';
import {expect} from 'chai';

describe('<Settings />', () => {
  it('should render Settings component', () => {
    const component = shallow(<Settings />);
    expect(component).to.exists
  });
});



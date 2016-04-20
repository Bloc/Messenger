import React, {Text, TextInput, TouchableHighlight} from 'react-native';
import {shallow} from 'enzyme';
import Main from '../Main';
import {expect} from 'chai';

describe('<Main />', () => {
  it('should render Main component', () => {
    const component = shallow(<Main />);
    expect(component).to.exists
  });
});



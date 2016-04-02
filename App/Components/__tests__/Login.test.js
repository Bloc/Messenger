import React, {View, TextInput} from 'react-native';
import {shallow} from 'enzyme';
import Login from '../Login';
import {expect} from 'chai';

describe('<Login />', () => {
  it('should render a line', () => {
    const component = shallow(<Login />);
    expect(component.find(View)).to.have.length(1);
  });

  it('populates email field', () => {
    const component = shallow(<Login />);
    component.setState({username: 'bill@mail.com'});
    expect(component.contains(<TextInput value='bill@email.com' />));
  });
});

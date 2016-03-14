import React from 'react-native';
import {shallow} from 'enzyme';
import Separator from '../Separator.js';
import {expect} from 'chai';

describe('<Separator />', () => {
  it('should render a line', () => {
    const component = shallow(<Separator />);
    expect(component.length).to.equal(1);
  });
});

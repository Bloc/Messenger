import squish from './index.js';
import {expect} from 'chai';

describe('#squish', () => {
  it('will remove leading white spaces', () => {
    const spaceText = '\nthis has no leading space';
    const noSpaceText = squish(spaceText);
    expect(noSpaceText).to.equal('this has no leading space');
  });
});


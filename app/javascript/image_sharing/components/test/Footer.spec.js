import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Footer from '../Footer';

describe('<Footer />', () => {
  const wrapper = shallow(<Footer />);

  it('should have text in a paragraph', () => {
    expect(wrapper.find('p')).to.have.lengthOf(1);
  });

  it('should name AppFolio Onboarding as copyright holder', () => {
    expect(wrapper.find('p').text()).to.equal('Copyright: AppFolio Inc. Onboarding');
  });
});

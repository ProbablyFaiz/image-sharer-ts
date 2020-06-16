import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Header from '../Header';

describe('<Header />', () => {
  const wrapper = shallow(<Header title='AppFolio Onboarding!' />);

  it('should have a headline', () => {
    expect(wrapper.find('h3')).to.have.lengthOf(1);
  });

  it('should render the title in the headline', () => {
    expect(wrapper.find('h3').text()).to.equal('AppFolio Onboarding!');
  });
});

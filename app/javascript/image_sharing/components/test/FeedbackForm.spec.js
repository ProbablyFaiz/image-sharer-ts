import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiEnzyme from 'chai-enzyme';

import FeedbackForm from '../FeedbackForm';
import FeedbackStore from '../../stores/FeedbackStore';

chai.use(chaiEnzyme());

describe('<FeedbackForm />', () => {
  const wrapper = mount(<FeedbackForm />);

  it('should have username input with an onChange handler', () => {
    const userNameInput = wrapper.find('input#userName');
    expect(userNameInput).to.have.lengthOf(1);
    expect(userNameInput).to.have.attr('type', 'text');
    expect(userNameInput).to.have.prop('onChange');
  });

  it('should have comments textarea with an onChange handler', () => {
    const commentsBox = wrapper.find('textarea#comments');
    expect(commentsBox).to.have.lengthOf(1);
    expect(commentsBox).to.have.prop('onChange');
  });
});

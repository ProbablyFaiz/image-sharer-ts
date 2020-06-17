import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiEnzyme from 'chai-enzyme';

import FeedbackForm from '../FeedbackForm';

chai.use(chaiEnzyme());

describe('<FeedbackForm />', () => {
  const wrapper = mount(<FeedbackForm />);

  it('should have username input', () => {
    const userNameInput = wrapper.find('input#userName');
    expect(userNameInput).to.have.lengthOf(1);
    expect(userNameInput.first()).to.have.attr('type', 'text');
  });

  it('should have comments textarea', () => {
    const commentsBox = wrapper.find('textarea#comments');
    expect(commentsBox).to.have.lengthOf(1);
  });
});

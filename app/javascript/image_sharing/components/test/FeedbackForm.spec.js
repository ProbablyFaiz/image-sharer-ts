import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { afterEach, beforeEach, describe, it } from 'mocha';
import React from 'react';
import sinon from 'sinon';

import FeedbackForm from '../FeedbackForm';
import { FeedbackStore } from '../../stores/FeedbackStore';

chai.use(chaiEnzyme());

const stubActionOnStore = (store, actionProp) => {
  const stub = sinon.stub();
  Object.defineProperty(
    store,
    actionProp,
    { configurable: true, writeable: true, enumerable: false, value: stub }
  );
  return stub;
};

describe('<FeedbackForm />', () => {
  let mockStore;
  let onSubmitStub;
  let wrapper;

  beforeEach(() => {
    mockStore = new FeedbackStore();
    onSubmitStub = stubActionOnStore(mockStore, 'onSubmit');
    sinon.stub(React, 'useContext').returns({ feedbackStore: mockStore, FAKE: true });
    wrapper = mount(<FeedbackForm />);
  });

  afterEach(() => sinon.restore());

  it('should have username input with an onChange handler', () => {
    const userNameInput = wrapper.find('input#userName');
    expect(userNameInput).to.have.lengthOf(1);
    expect(userNameInput).to.have.attr('type', 'text');
    expect(userNameInput).to.have.prop('onChange');
    userNameInput.instance().value = 'foo';
    userNameInput.simulate('change');
    expect(mockStore.userName).to.equal('foo');
  });

  it('should have comments textarea with an onChange handler', () => {
    const commentsBox = wrapper.find('textarea#comments');
    expect(commentsBox).to.have.lengthOf(1);
    expect(commentsBox).to.have.prop('onChange');
    commentsBox.instance().value = 'foo';
    commentsBox.simulate('change');
    expect(mockStore.comments).to.equal('foo');
  });

  it('should submit to the store', () => {
    wrapper.find('form').simulate('submit');
    sinon.assert.calledOnce(onSubmitStub);
  });
});

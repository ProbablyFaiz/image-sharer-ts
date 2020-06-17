import { expect } from 'chai';
import { observe } from 'mobx';
import { beforeEach, describe, it } from 'mocha';

import { FeedbackStore } from '../FeedbackStore';

describe('FeedbackStore', () => {
  let feedbackStore;

  beforeEach(() => {
    feedbackStore = new FeedbackStore();
  });

  ['userName', 'comments'].forEach(observable =>
    it(`has a ${observable} observable`, async () => {
      const valueChanged = new Promise(resolve => observe(feedbackStore, observable, resolve));

      feedbackStore[observable] = `Foo ${observable}`;
      const change = await valueChanged;

      expect(change).to.haveOwnProperty('newValue', `Foo ${observable}`);
    }));
});

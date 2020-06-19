import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';

import { PostFeedbackService } from '../PostFeedbackService';
import * as Helpers from '../../utils/helper';

describe('PostFeedbackService', () => {
  describe('.submitFeedback', () => {
    let postStub;

    beforeEach(() => {
      postStub = sinon.stub(Helpers, 'post');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('delegates to POST helper and resolves with the success response', async () => {
      postStub.withArgs('/api/feedbacks', { username: 'user', comments: 'comment' }).onFirstCall().resolves({ body: 'all good' });

      const response = await PostFeedbackService.submitFeedback('user', 'comment');

      sinon.assert.calledOnce(postStub);

      expect(response).to.deep.equal({ body: 'all good' });
    });

    it('delegates to POST helper and rejects with the error', async () => {
      postStub.rejects(Error('No!'));

      try {
        await PostFeedbackService.submitFeedback('user', 'comment');
        throw Error('submitFeedback did not reject as expected');
      } catch (response) {
        sinon.assert.calledOnce(postStub);

        expect(response).to.be.an('error');
        expect(response.message).to.equal('No!');
      }
    });
  });
});

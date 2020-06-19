import { post } from '../utils/helper';

export class PostFeedbackService {
  static submitFeedback(username, comments) {
    return post('/api/feedbacks', { username, comments });
  }
}

export default PostFeedbackService;

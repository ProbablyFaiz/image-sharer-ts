import { post } from '../utils/helper';

export class PostFeedbackService {
  static submitFeedback(username: string, comments: string) {
    return post('/api/feedbacks', { username, comments });
  }
}

export default PostFeedbackService;

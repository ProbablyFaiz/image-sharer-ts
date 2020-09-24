import { observable, action, runInAction } from 'mobx';

import { PostFeedbackService } from '../services/PostFeedbackService';
import { ApiResponseError } from '../utils/helper';

export class FeedbackStore {
  @observable userName = '';
  @observable comments = '';
  @observable alert = { level: '', message: '' };

  @action.bound
  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this[event.target.name] = event.target.value;
  }

  @action.bound
  onSubmit() {
    const onSuccess = () => {
      runInAction(() => {
        this.comments = '';
        this.alert = { level: 'success', message: 'Your feedback has been saved.' };
      });
    };

    const onFailure = (e: ApiResponseError) => {
      runInAction(() => {
        this.alert = { level: 'error', message: e.data || e.message };
      });
    };

    PostFeedbackService.submitFeedback(this.userName, this.comments).then(onSuccess, onFailure);
  }
}

export default FeedbackStore;

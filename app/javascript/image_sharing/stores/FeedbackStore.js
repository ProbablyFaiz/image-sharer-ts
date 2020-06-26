import { observable, action } from 'mobx';

export class FeedbackStore {
  @observable userName = '';
  @observable comments = '';

  @action.bound
  onChange(event) {
    this[event.target.name] = event.target.value;
  }
}

export default FeedbackStore;

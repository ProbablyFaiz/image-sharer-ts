import { observable } from 'mobx';

export interface Comment {
  created_at: string;
  id: number;
  text: string;
}

export class CommentsStore {
  @observable comments: Comment[] = [];

  constructor() {
    this.comments = [
      { created_at: 'Just now', id: 1, text: 'I am a sample comment' }
    ]

  }
}

export default CommentsStore;

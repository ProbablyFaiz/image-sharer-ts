import { action, observable, runInAction } from 'mobx';
import CommentsService, { Comment } from '../services/CommentsService';

export class CommentsStore {
  @observable comments: Comment[] = [];

  constructor(private _imageId: string) {
    this.loadComments();
  }

  @action loadComments = async () => {
    const comments = await CommentsService.getComments(this._imageId);
    runInAction(() => {
      this.comments = comments;
    });
  }
}

export default CommentsStore;

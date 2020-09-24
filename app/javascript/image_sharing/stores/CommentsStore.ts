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

  @action submitComment = async (commentText: string) => {
    await CommentsService.createComment(this._imageId, commentText);
    const newComment: Comment = {
      id: (this.comments[this.comments.length - 1]?.id ?? 0) + 1,
      text: commentText,
      created_at: 'just now'
    }
    this.comments.push(newComment);
  }
}

export default CommentsStore;

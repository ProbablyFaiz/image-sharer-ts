import { observable, action } from 'mobx';
import CommentsService, { Comment } from "../services/CommentsService";

export class CommentsStore {
  image_id: string;
  @observable comments: Comment[] = [];

  @action fetchComments = () => {
    CommentsService.getComments(this.image_id).then((commentsResponse) => {
      this.comments = commentsResponse;
    })
  }

  constructor(image_id: string) {
    this.image_id = image_id;
    this.fetchComments();
  }
}

export default CommentsStore;

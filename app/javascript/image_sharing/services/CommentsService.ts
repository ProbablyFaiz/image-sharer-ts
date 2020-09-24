import { get } from '../utils/helper';

export interface Comment {
  id: number;
  text: string;
  created_at: string;
}

type CommentsResponse = Comment[];

export class CommentsService {
  static getComments(image_id: string) {
    return get(`/api/comments?image_id=${image_id}`) as Promise<CommentsResponse>;
  }
}

export default CommentsService;

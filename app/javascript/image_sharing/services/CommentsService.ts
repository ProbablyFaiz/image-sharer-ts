import {get, post} from '../utils/helper';

export interface Comment {
    created_at: string;
    id: number;
    text: string;
}

export type CommentsResponse = Comment[];

export class CommentsService {
    static getComments(image_id: string) {
        return get(`/api/comments?image_id=${image_id}`) as Promise<CommentsResponse>;
    }

    static createComment(image_id: string, text: string) {
      return post('/api/comments', { image_id, text });
    }
}

export default CommentsService;


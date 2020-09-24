import React, { Component, Fragment } from 'react';
import { observer } from "mobx-react";

interface Comment {
  created_at: string;
  id: number;
  text: string;
}

interface CommentsListProps {
  comments?: Comment[];
}

@observer
class CommentsList extends Component<CommentsListProps> {
  render() {
    return (
      <Fragment>
        <h2>Comments</h2>
        {this.props.comments?.map(comment =>
          <div key={comment.id}>
            {comment.text}
            <div style={{ color: "grey", fontSize: "14px" }}>
              {comment.created_at}
            </div>
            <br />
          </div>
        )}
      </Fragment>
    );
  }
}

export default CommentsList;

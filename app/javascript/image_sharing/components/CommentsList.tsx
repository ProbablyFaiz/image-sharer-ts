import React, {Component, Fragment} from 'react';
import CommentsStore from "../stores/CommentsStore";
import {observer} from "mobx-react";

interface CommentsListProps {
  commentsStore: CommentsStore;
}

@observer
class CommentsList extends Component<CommentsListProps> {
  render() {
    return (
      <Fragment>
        {this.props.commentsStore.comments.map(comment =>
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

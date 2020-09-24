import React from 'react';

import CommentsStore from '../stores/CommentsStore';
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

const imageId = window.location.href.split('/').pop()!;

const App = () => {
  let commentsStore = new CommentsStore(imageId);
  return (
    <div>
      <CommentsList commentsStore={commentsStore} />
      <CommentForm commentsStore={commentsStore} />
    </div>
  );
};

export default App;

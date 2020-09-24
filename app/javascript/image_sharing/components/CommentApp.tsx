import React from 'react';

import CommentsStore from '../stores/CommentsStore';
import CommentsList from "./CommentsList";

const imageId = window.location.href.split('/').pop()!;

const App = () => (
  <div>
    <CommentsList commentsStore={new CommentsStore(imageId)} />
  </div>
);

export default App;

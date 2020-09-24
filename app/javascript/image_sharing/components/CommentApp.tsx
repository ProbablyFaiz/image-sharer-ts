import React from 'react';

import CommentsStore from '../stores/CommentsStore';
import CommentsList from "./CommentsList";

const App = () => (
  <div>
    <CommentsList commentsStore={new CommentsStore()} />
  </div>
);

export default App;

import React from 'react';
import CommentsList from "./CommentsList";
import {CommentsStore} from "../stores/CommentsStore";

const App = () => (
  <div>
    <CommentsList commentsStore={new CommentsStore(window.location.href.split('/').pop()!)} />
  </div>
);

export default App;

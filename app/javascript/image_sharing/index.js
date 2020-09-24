import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import CommentsApp from './components/CommentApp';

const feedbackRoot = document.getElementById('feedback-root');
const commentsRoot = document.getElementById('comments-root');

if (feedbackRoot) {
  ReactDOM.render(<App />, feedbackRoot);
}

if (commentsRoot) {
  ReactDOM.render(<CommentsApp />, commentsRoot);
}

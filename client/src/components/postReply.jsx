import React from 'react';
import ReactDOM from 'react-dom';

const PostReply = (props) => (
  <div className="reply-container">
    <p className="reply reply-body">
      {props.data.body}
    </p>
    <div className="reply-legend">
      <span className="reply reply-author">By: {props.data.author}</span>
      <span className="reply reply-score">Score: {props.data.score}</span>
    </div>
  </div>
);
  


export default PostReply;
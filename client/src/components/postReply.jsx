import React from 'react';
import ReactDOM from 'react-dom';

const PostReply = (props) => (
  <div className="post-container">
    <p className="post post-body">
      {props.data.body}
    </p>
    <div className="post-legend">
      <span className="post post-author">{props.data.author}</span>
      <span className="post post-score">{props.data.score}</span>
    </div>
  </div>
);
  


export default PostReply;
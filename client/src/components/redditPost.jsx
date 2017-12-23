import React from 'react';
import ReactDOM from 'react-dom';
import PostReply from './postReply.jsx';

const RedditPost = (props) => (
  <div>
    <span className="post-title">
      <a href={props.post.url}> {props.post.title}</a>
    </span>
    <ul>
      {props.post.replies.map((reply, i) => (
        <PostReply data={reply} key={i} />
      ))}
    </ul>
  </div>
)

export default RedditPost;
import React from 'react';
import ReactDOM from 'react-dom';
import PostReply from './postReply.jsx';

class RedditPost extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      accordClass: 'inactive',
      panelStyle: {display: 'none'}
    };
  }

  handleClick () {
    console.log('Button clicked');
    this.setState({
      accordClass: this.state.accordClass === 'inactive' ? 'active' : 'inactive',
      panelStyle: this.state.panelStyle.display === 'none' ? {display: 'block'} : {display: 'none'}
    });
  }

  render () {
    return (
      <div className="post-container">
        <div className="post-title">
          <a href={this.props.post.url}> {this.props.post.title}</a>
          <button className={"accordian " + this.state.accordClass} onClick={this.handleClick.bind(this)}>...</button>
          <div className="panel" style={this.state.panelStyle}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
        <ul>
          {this.props.post.replies.map((reply, i) => (
            <PostReply data={reply} key={i} />
          ))}
        </ul>
      </div>
    )
  }
}

export default RedditPost;
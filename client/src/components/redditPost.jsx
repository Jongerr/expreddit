import React from 'react';
import ReactDOM from 'react-dom';
import PostReply from './postReply.jsx';

class RedditPost extends React.Component{
  constructor(props) {
    let buttonStyle = {display: 'inline-block'};
    if(!props.post.selftext) {
      buttonStyle = {display: 'none'};
    }
    super(props);
    this.state = {
      accordClass: 'inactive',
      panelStyle: {display: 'none'},
      buttonStyle: buttonStyle
    };
  }

  handleClick () {
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
          <button className={"accordian " + this.state.accordClass} onClick={this.handleClick.bind(this)} style={this.state.buttonStyle}>...</button>
          <div className="panel" style={this.state.panelStyle}>
            <p>{this.props.post.selftext}</p>
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
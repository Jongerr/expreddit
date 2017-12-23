import React from 'react';
import ReactDOM from 'react-dom';
import RedditPost from './components/redditPost.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditName: '',
      subredditData: {}
    };
  }

  handleInputChange(e) {
    this.setState({subredditName: e.target.value});
  }

  handleSubmit(e) {
    const subredditName = JSON.stringify({subredditName: this.state.subredditName.trim()});
    if(this.state.subredditName.length === 0) {
      return;
    }
    console.log('Hello,', this.state.subredditName);
    fetch('/subreddit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: subredditName
    }).then(response => response.json())
      .then(response => this.setState({subredditData: response}));

    e.preventDefault();
  }

  render() {
    return (
      <div> 
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.subredditName} placeholder= "subreddit" onChange={this.handleInputChange.bind(this)}/>
          <button type="submit">Submit</button>
        </form>
        <div className="reddit-posts">
          {Object.keys(this.state.subredditData).map((key) => (
            <RedditPost post={this.state.subredditData[key]} key={key} />
          ))}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('#app'));
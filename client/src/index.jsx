import React from 'react';
import ReactDOM from 'react-dom';
import RedditPost from './components/redditPost.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditName: '',
      subredditData: {},
      subredditTitle: '',
      sentiment: ''
    };
    this.setSentiment = this.setSentiment.bind(this);
    this.fetchSubredditData = this.fetchSubredditData.bind(this);
  }

  handleInputChange(e) {
    this.setState({subredditName: e.target.value});
  }

  setSentiment(sentimentData) {
    const totalSentiment = sentimentData.documents.reduce((sum, sent) => (sum + Number(sent.score)), 0);
    const averageSentiment = (totalSentiment / sentimentData.documents.length).toPrecision(5).toString();
    this.setState({sentiment: averageSentiment});
  }

  fetchSubredditData(subredditName) {
    fetch('/subreddit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: subredditName
    }).then(response => response.json())
      .then(response => {
        this.setState({subredditName: ''});
        console.log('Reponse:', response);
        let key = Object.keys(response.replies)[0];
        let sentimentData = JSON.parse(response.sentiment);
        this.setState({
          subredditData: response.replies, 
          subredditTitle: 'r/' + response.replies[key].subreddit,
        });
        this.setSentiment(sentimentData);
      });

  }

  handleSubmit(e) {
    const subredditName = JSON.stringify({subredditName: this.state.subredditName.trim()});
    // if(this.state.subredditName.length === 0) {
    //   return;
    // }
    console.log('Hello,', this.state.subredditName);
    this.fetchSubredditData(subredditName);
    e.preventDefault();
  }

  componentDidMount() {
    this.fetchSubredditData('');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.subredditName} placeholder= "subreddit" onChange={this.handleInputChange.bind(this)}/>
          <button type="submit">Submit</button>
        </form>
        <div className="heading">
          <h1 className="subreddit-title">{this.state.subredditTitle}</h1>
          <div className="sentiment-container" style={this.state.sentiment ? {display: 'inline-block'} : {display: 'none'}}>
            <div>Sentiment Score:</div>
            <div>{this.state.sentiment}</div>
          </div>
        </div>
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
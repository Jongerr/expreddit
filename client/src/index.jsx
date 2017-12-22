import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {name: 'Travis'};
  }

  handleInputChange(e) {
    this.setState({name: e.target.value});
  }

  handleSubmit(e) {
    const name = JSON.stringify({name: this.state.name});
    console.log('Hello,', this.state.name);
    fetch('/subreddit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: name
    }).then(response => {
      console.log('Response:', response);
      return response.json();
    })
      .then(response => console.log(response));
    e.preventDefault();
  }

  render() {
    return (
      <div> 
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('#app'));
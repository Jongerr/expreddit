import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {name: 'Travis'};
  }

  render() {
    return (
      <div> 
        <span>Hello: {this.state.name}</span>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('#app'));
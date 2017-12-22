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
    console.log('Hello,', this.state.name);
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
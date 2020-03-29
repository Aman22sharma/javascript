import React, {Component} from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      content: {}
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => {
      this.setState({
        content: data,
        loading: false
      });
    })
  }
  handleClick() {
    window.location.reload();
  }
  render() {
    if(this.state.loading) {
      return (
        <p>Loading Chuck Norris Jokes, stay there!!</p>
      )
    } else {
      return (
        <div>
          <h1>Chuck Norris Jokes</h1>
          <a href={this.state.content.url}><img src={this.state.content.icon_url} alt='' /></a>
          <p>{this.state.content.value}</p>
          <button onClick={this.handleClick}>Next joke</button>
        </div>
      );
    }
  }
}

export default App;
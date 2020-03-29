import React, {Component} from 'react';
import Joke from './Joke';

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: [],
      isLoaded: false,
      error: null
    }
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    this.getData();
  }
  async getData() {
    try {
      await fetch('https://official-joke-api.appspot.com/random_ten')
      .then(response => {
        if(response.ok) return response.json()
        else throw new Error('Something is wrong...')
      })
      .then(data => this.setState({
        content: data,
        isLoaded: false
      }));
    }
    catch(error) {
      this.setState({
        error,
        isLoaded: false
      });
    }
  }
  handleClick() {
    this.getData();
  }
  render() {
    const {isLoaded, content, error} = this.state;
    const onClick = this.handleClick;
    const jokes = content.map(item => <Joke key={item.id} content={item} />);
    if(error) return <p>{error.message}</p>;
    if(isLoaded) return <p>Loading...</p>;
    return (
      <div className='app'>
        <button onClick={onClick}>More jokes</button>
        <div className='jokes'>{jokes}</div>
      </div>
    );
  }
}

export default App;
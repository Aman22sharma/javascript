import React, {Fragment, Component} from 'react';
import Item from './Item';

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: [],
      isLoaded: false,
      changedValue: null,
      isChanged: false,
      error: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.getData = this.getData.bind(this);
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    this.getData();
  }
  async getData() {
    try {
      let url = 'https://www.boredapi.com/api/activity/';
      await fetch(url)
      .then(response => {
        if(response.ok) return response.json()
        else throw new Error('Something is wrong...')
      })
      .then(data => this.setState({
        content: data,
        isLoaded: false,
        isChanged: false,
        changedValue: null
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
    this.setState({
      isChanged: false,
      changedValue: null
    });
  }
  render() {
    const {isLoaded, content, error} = this.state;
    const onClick = this.handleClick;
    if(error) return <p>{error.message}</p>;
    if(isLoaded) return <p>Loading...</p>;
    return (
      <Fragment>
        <Item content={content} key={this.state.content.key} />
        <button className='pure-button pure-button-primary' onClick={onClick}>See another activity</button>
      </Fragment>
    );
  }
}

export default App;
import React, {Component} from 'react';
import Breed from './Breed';
import './index.css';

class App extends Component {
  constructor() {
    super();
      this.state = {
        type: [],
        isLoaded: false
      }
  }
  getData = async () => {
    const BREEDS_API = await fetch('https://dog.ceo/api/breeds/list/all');
    const BREEDS_DATA = await BREEDS_API.json();
    let breedType = Object.entries(BREEDS_DATA.message);
    this.setState({
      type: breedType,
      isLoaded: true,
    });
  }
  componentDidMount = () => {
    this.getData();
  }
  render = () => {
    let breedList;
    if(this.state.isLoaded) {
      breedList = this.state.type.map(item => {
        return <Breed key={item[0]} name={item[0]} />
      });
    }
    return (
      <div className='app'>
        <h1 className='app__title'>{this.props.title}</h1>
        {breedList}
      </div>
    );
  }
}

export default App;
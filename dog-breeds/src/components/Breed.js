import React, {Component} from 'react';

class Breed extends Component {
  constructor() {
    super();
      this.state = {
        image: []
      }
  }
  getData = async () => {
    const DOG_API = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=3TPA5in5oLfJyfpk8iMjMzx7MoKR7dRS&q=${this.props.name+'+dog+breed'}&limit=5`);
    const DOG_DATA = await DOG_API.json();
    const RANDOM = Math.floor(Math.random() * 5);
    const DOG_PIC = DOG_DATA.data[RANDOM].images.downsized_medium.url;
    const DOG_IMG = (!DOG_PIC || typeof DOG_PIC === typeof undefined || DOG_PIC === '') ? 'https://media.giphy.com/media/moXqsEVbHOQtG/giphy.gif' : DOG_PIC;
    this.setState({
      image: DOG_IMG
    });
  }
  componentDidMount = () => {
    this.getData();
  }
  render(props) {
    return (
      <div className='pic'>
        <img className='pic__thumb' alt='' src={this.state.image} />
        <p className='pic__title'>{this.props.name}</p>
      </div>
    );
  }
}

export default Breed;
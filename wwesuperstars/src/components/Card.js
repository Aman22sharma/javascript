import React from 'react';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null
    }
  }
  componentDidMount() {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=3TPA5in5oLfJyfpk8iMjMzx7MoKR7dRS&q=${this.props.src}&limit=1`)
    .then(response => response.json())
    .then(data => {
      let imageURL = data.data[0].images.downsized_medium.url;
      this.setState({
        image: (typeof imageURL !== undefined) ? imageURL : 'https://media2.giphy.com/media/xT1R9JFTKhIpOYBvos/giphy.gif?cid=790b76115cbbb92264792e2f55a4ef3f'
      });
    });
  }
  render(props) {
    return (
      <div className='card'>
        <div className='card__thumbnail'><img src={this.state.image} alt={this.props.name}></img></div>
        <div className='card__title'>{this.props.name}</div>
      </div>
    );
  }
}

export default Card;
import React, {Component} from 'react';

class Item extends Component {
  render(props) {
    return (
      <div className='activity'>
        <h1 className='activity__name'>{this.props.content.activity}</h1>
        <p className='activity__type'><strong><span role='img' aria-label='Type'>💡</span> Type:</strong> {this.props.content.type}</p>
        <p className='activity__price'><strong><span role='img' aria-label='Funds'>💰</span> Funds needed:</strong> ${this.props.content.price * 100}</p>
        <p className='activity__participants'><strong><span role='img' aria-label='Participants'>👯</span> Participants needed:</strong> {this.props.content.participants}</p>
        <p className='activity__accessibility'><strong><span role='img' aria-label='Accessibility'>♿</span> Accessibility scale:</strong> {this.props.content.accessibility}</p>
      </div>
    );
  }
}

export default Item;
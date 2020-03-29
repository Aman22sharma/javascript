import React, {Component} from 'react';

class Item extends Component {
  render(props) {
    console.log(this.props);
    return (
      <div className='item'>
        <h1 className='person'>
          <span className='icon'>{this.props.content.gender==='male' ? '👦🏻' : '👧🏻'}</span>
          <span className='words'>
            <span className='name'>{this.props.content.name}</span>
            <span className='surname'>{this.props.content.surname}</span>
          </span>
        </h1>
      </div>
    );
  }
}

export default Item;
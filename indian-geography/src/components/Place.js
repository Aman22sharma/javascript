import React, {Component} from 'react';

class Place extends Component {
  render(props) {
    return (
        <li className='list-group-item' onClick={() => this.props.onClick && this.props.onClick(this.props.place)}>{this.props.place}</li>
    );
  }
}

export default Place;
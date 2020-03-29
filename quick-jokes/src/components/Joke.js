import React, {Component} from 'react';

class Joke extends Component {
  render(props) {
    return (
      <div className='joke'>
        <h1 className='title'>{this.props.content.setup}</h1>
        <h2 className='punchline'>{this.props.content.punchline}</h2>
      </div>
    );
  }
}

export default Joke;
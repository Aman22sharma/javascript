import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className='footer'>{this.props.content}</footer>
    );
  }
}

export default Footer;
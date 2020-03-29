import React, { Component } from 'react'

class ModeToggleButton extends Component {
  constructor() {
    super();
    this.handleMode = this.handleMode.bind(this);
  }
  handleMode(event, value) {
    event.preventDefault();
    this.props.onModeChange && this.props.onModeChange(value)
  }
  render() {
    const city = this.props.mode === 'city' ? 'btn-primary' : ''
    const district = this.props.mode === 'district' ? 'btn-primary' : ''
    const state = this.props.mode === 'state' ? 'btn-primary' : ''
    return (
      <div className='col col-12'>
        <div className='btn-group mb-4' role='group' aria-label='Navigation'>
          <button className={`btn ${city}`} onClick={(e) => this.handleMode(e, 'city')}>See cities</button>
          <button className={`btn ${district}`} onClick={(e) => this.handleMode(e, 'district')}>See districts</button>
          <button className={`btn ${state}`} onClick={(e) => this.handleMode(e, 'state')}>See states</button>
        </div>
      </div>
    );
  }
}

export default ModeToggleButton;
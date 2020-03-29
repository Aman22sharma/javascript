import React from 'react'

const Input = (props) =>
  <input
    id="findDeveloper"
    type="text"
    className="form-control"
    placeholder="Type in developer's username e.g. wesbos or taniarascia..."
    onChange={props.handleChange}
    value={props.inputValue}
    autoFocus
  />

export default Input
import React from 'react'

const Language = (props) =>
  <small className={props.class}>
    <strong>{props.title}:</strong> {props.metadata}
  </small>

export default Language
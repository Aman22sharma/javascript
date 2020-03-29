import React from 'react'

const Description = (props) =>
  <p className={props.class}>
    <strong>{props.title}</strong>: {props.metadata}
  </p>

export default Description
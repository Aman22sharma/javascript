import React from 'react'

const Badge = (props) =>
  <span className={props.class}>
    {props.title}: {props.metadata}
  </span>

export default Badge
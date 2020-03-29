import React from 'react';

function Summary (props) {
  if (props.state && props.city && props.district) {
    return <div className='mb-3'>
      <h4>Total number of cities: {props.city.length}</h4>
      <h4>Total number of districts: {props.district.length}</h4>
      <h4>Total number of states: {props.state.length}</h4>
    </div>
  }

  return null
}

export default Summary;
import React from 'react';
import Place from './Place'

function CityList(props) {
  if (!props.cities.length) {
    return null
  }
  return props.cities.map(item => <Place key={item} place={item} />)
}

export default CityList;
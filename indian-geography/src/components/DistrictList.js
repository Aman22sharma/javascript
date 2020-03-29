import React, { Component } from 'react';
import CityList from './CityList'
import Place from './Place'

class DistrictList extends Component {
  constructor() {
    super();
    this.state = {
      selected: null
    }
    this.handleSelected = this.handleSelected.bind(this)
  }
  handleSelected(value) {
    this.setState(function (state) {
      return { selected: value === state.selected ? null : value }
    })
  }
  render () {
    const { data, districts } = this.props;
    const { selected } = this.state;
    return districts.map(item => {
      const isSelected = item === selected;
      const citiesInSelectedDistrict = isSelected && 
      [...new Set(data.filter(item => item.District === selected).map(item => item.City))].sort()
      
      return <div>
        <Place key={item} place={item} onClick={this.handleSelected} />
        <ul>
          {
            isSelected && <CityList cities={citiesInSelectedDistrict} />
          }
        </ul>
      </div>
    });
  }
}

export default DistrictList;
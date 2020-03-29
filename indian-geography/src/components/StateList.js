import React, { Component } from 'react';
import Place from './Place'
import DistrictList from './DistrictList'

class StateList extends Component {
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
    const { data, states } = this.props;
    const { selected } = this.state;
    return states.map(item => {
      const isSelected = item === selected;
      const districtsInSelectedState = isSelected && 
      [...new Set(data.filter(item => item.State === selected).map(item => item.District))].sort()
      
      return <div>
        <Place key={item} place={item} onClick={this.handleSelected} />
        <ul>
          {
            isSelected && <DistrictList
              data={data}
              districts={districtsInSelectedState} />
          }
        </ul>
      </div>
    });
  }
}

export default StateList;
import React, { Component } from 'react';
import StateList from './StateList'
import DistrictList from './DistrictList'
import CityList from './CityList'
import Summary from './Summary'

class Listing extends Component {
  render() {
    const {data } = this.props;
    const { mode } = this.props;
    const cities = [...new Set(data.map(place => place.City))].sort();
    const districts = [...new Set(data.map(place => place.District))].sort();
    const states = [...new Set(data.map(place => place.State))].sort();

    let listing
    if (mode === 'state') {
      listing = <StateList
        data={data}
        states={states}
      />
    } else if (mode === 'district') {
      listing = <DistrictList
        data={data}
        districts={districts}
     />
    } else if (mode === 'city') {
      listing = <CityList cities={cities} />
    }

    return <div>
      <Summary
        states={states}
        cities={cities}
        districts={districts}
      />
      { listing }
    </div>
  }
}

export default Listing;
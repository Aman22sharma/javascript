import React, { Component } from 'react';
import './Content.css';
import AddStation from '../AddStation/AddStation';
import SearchStation from '../SearchStation/SearchStation';
import ListStation from '../ListStation/ListStation';

class Content extends Component {
  render() {
    const { stations, handleDeleteStation, formDisplay, toggleForm, handleAddStation, orderBy, orderDir, changeOrder, searchStation } = this.props
    return (
      <>
        <main className='main'>
          <div className='container'>
            <div className='row'>
              <div className='col col-12'>
                <AddStation
                  formDisplay={formDisplay}
                  toggleForm={toggleForm}
                  handleAddStation={handleAddStation}
                />
                <SearchStation
                  orderBy={orderBy}
                  orderDir={orderDir}
                  changeOrder={changeOrder}
                  searchStation={searchStation}
                />
                <ListStation
                  stations={stations}
                  handleDeleteStation={handleDeleteStation}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}

export default Content;

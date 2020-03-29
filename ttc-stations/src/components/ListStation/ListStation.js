import React, { Component } from 'react';
import './ListStation.css';
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";

class Station extends Component {
  render() {
    const {station} = this.props

    const lineClass = typeof station.line === 'string' && station.line === 'Yonge-University'
    ? 'line-one'
    : typeof station.line === 'string' && station.line === 'Bloor-Danforth'
    ? 'line-two'
    : typeof station.line === 'string' && station.line === 'Scarborough'
    ? 'line-three'
    : typeof station.line === 'string' && station.line === 'Sheppard'
    ? 'line-four'
    : 'line-multiple';

    const lines = (typeof station.line === 'string')
                  ? <span className={`badge badge-pill m-0 ${lineClass}`}><strong>Line:</strong> {station.line}</span>
                  : <><span className={`badge badge-pill m-0 mb-1 ${lineClass}`}><strong>Line:</strong> {station.line[0]}</span><span className={`badge badge-pill m-0 ${lineClass}`}><strong>Line:</strong> {station.line[1]}</span></>

return (
      <>
        <div className='col col-12 col-md-4 col-lg-3 mb-3 mb-md-4'>
          <div className='card h-100'>
            <img src={station.thumb} alt={station.name} className='card-img-top img-fluid' />
            <div className='card-body'>
              <h5 className='card-title m-0 p-0 mb-2 font-weight-bold'>{station.name}</h5>
              {lines}
            </div>
            <div className="card-footer">
              <div className='d-flex justify-content-between mx-0 my-2'>
                <a className='d-block m-0 px-3 py-2 btn btn-default btn-success' href={station.location} target='_blank' rel='noopener noreferrer'>
                  <FaMapMarkerAlt />
                </a>
                <button className='d-block m-0 px-3 py-2 btn btn-default btn-danger' onClick={event => this.props.handleDeleteStation(station)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

class ListStation extends Component {
  render() {
    const { stations } = this.props
    const viewStations = stations.map(station =>
      <Station station={station} key={station.id} handleDeleteStation={this.props.handleDeleteStation} />
    )
    return (
      <>
        <section className='list-station'>
          <div className='row'>
            {viewStations}
          </div>
        </section>
      </>
    )
  }
}

export default ListStation;

import React, { Component } from 'react';
import './AddStation.css';
import { FaPlus } from "react-icons/fa";

class AddStation extends Component {
  state = {
    name: '',
    line: '',
    thumb: '',
    location: ''
  }
  handleAddForm = event => {
    const {stationName, stationLine, stationThumb, stationLocation} = this.state;
    event.preventDefault();
    let allFields = {
      name: stationName,
      line: stationLine,
      thumb: stationThumb,
      location: stationLocation
    }
    this.props.handleAddStation(allFields);
    this.setState({
      name: '',
      line: '',
      thumb: '',
      location: ''
    });
    this.props.toggleForm();
  }
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }
  render() {
    const {stationName, stationLine, stationThumb, stationLocation} = this.state;
    return (
      <>
        <section className={`${this.props.formDisplay ? '' : 'add-station'}`}>
          <div className='card mt-4 mb-3'>
            <div className='card-header m-0 p-0'>
              <button onClick={this.props.toggleForm} className='btn btn-default btn-primary btn-block d-flex align-content-center justify-content-center p-3' type='submit'><FaPlus /> <span className='m-0 p-0 ml-2' style={{'lineHeight': '1'}}>Add Station</span></button>
            </div>
            <div className='card-body'>
              <form className='add-station' onSubmit={this.handleAddForm}>
                <div className='form-group text-left'>
                  <label htmlFor='stationName' className='text-dark'>Station Name:</label>
                  <input name='stationName' id='stationName' type='text' placeholder='Enter Station Name' className='form-control' value={stationName} onChange={this.handleChange} />
                </div>
                <div className='form-group text-left'>
                  <label htmlFor='stationLine' className='text-dark'>Station Line:</label>
                  <input name='stationLine' id='stationLine' type='text' placeholder='Enter Station Line' className='form-control' value={stationLine} onChange={this.handleChange} />
                </div>
                <div className='form-group text-left'>
                  <label htmlFor='stationThumb' className='text-dark'>Station Thumbnail URL:</label>
                  <input name='stationThumb' id='stationThumb' type='text' placeholder='Enter Station Thumb URL' className='form-control' value={stationThumb} onChange={this.handleChange} />
                </div>
                <div className='form-group text-left'>
                  <label htmlFor='stationLocation' className='text-dark'>Station Location URL:</label>
                  <input name='stationLocation' id='stationLocation' type='text' placeholder='Enter Station Location URL' className='form-control' value={stationLocation} onChange={this.handleChange} />
                </div>
                <div className='form-group m-0'>
                  <button className='btn btn-default btn-primary' type='submit'>Add Station</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default AddStation;

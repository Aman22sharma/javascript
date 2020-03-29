import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';
import {without} from 'lodash';

class App extends Component {
  state = {
    stations: [],
    currentTime: new Date(),
    formDisplay: false,
    orderBy: 'name',
    orderDir: 'asc',
    queryText: ''
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
    fetch('./stations.json')
    .then(response => response.json())
    .then(stations => {
      const allStations = stations.map(station => station)
      this.setState({
        stations: allStations
      })
    })
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  toggleForm = () => {
    const { formDisplay } = this.state;
    this.setState({
      formDisplay: !formDisplay
    });
  }
  handleAddStation = newStation => {
    const { stations } = this.state;
    let allStations = stations;
    newStation.id = allStations.length + 1;
    allStations.unshift(newStation);
    this.setState({
      stations: allStations
    });
  }
  handleDeleteStation = station => {
    const {stations} = this.state;
    let updatedStations = without(stations, station);
    this.setState({
      stations: updatedStations
    });
  }
  tick = () => {
    this.setState({
      currentTime: new Date()
    });
  }
  changeOrder = (order, direction) => {
    this.setState({
      orderBy: order,
      orderDir: direction
    });
  }
  searchStation = query => {
    this.setState({
      queryText: query
    })
  }
  render() {
    const {stations, currentTime, formDisplay, orderBy, orderDir, queryText} = this.state
    let order;
    let filteredStations = stations;
    if(orderDir === 'asc') order = 1;
    else order = -1;
    filteredStations = filteredStations.sort((a, b) => {
      if(a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) return -1 * order;
      else return 1 * order;
    }).filter(eachItem => {
      return (
        eachItem['name'].toLowerCase().includes(queryText.toLowerCase())
      );
    });
    return (
      <>
        <Header />
        <Content
          stations={filteredStations}
          formDisplay={formDisplay}
          toggleForm={this.toggleForm}
          orderBy={orderBy}
          orderDir={orderDir}
          changeOrder={this.changeOrder}
          handleDeleteStation={this.handleDeleteStation}
          handleAddStation={this.handleAddStation}
          searchStation={this.searchStation}
        />
        <Footer currentTime={currentTime} />
      </>
    )
  }
}

export default App;

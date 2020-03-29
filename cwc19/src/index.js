import React, { Component } from 'react'
import { render } from 'react-dom'
import './index.css'

const Teams = [
  'Afghanistan',
  'Australia',
  'Bangladesh',
  'England',
  'India',
  'New Zealand',
  'Pakistan',
  'Sri Lanka',
  'West Indies'
]

class App extends Component {
  state = {
    activeTeams: [],
    inactiveTeams: [],
    newTeam: null
  }
  componentDidMount() {
    this.setState({
      activeTeams: [...Teams],
      inactiveTeams: ['South Africa']
    })
  }
  handleRemoveTeam = selectedTeam => {
    this.setState(currentState => {
      return {
        activeTeams: currentState.activeTeams.filter(team => team !== selectedTeam)
      }
    })
  }
  handleChange = event => {
    const value = event.target.value
    this.setState({
      newTeam: value
    })
  }
  handleAddTeam = event => {
    event.preventDefault()
    this.setState(currentState => {
      return {
        activeTeams: currentState.activeTeams.concat([currentState.newTeam])
      }
    })
  }
  handleClearTeams = event => {
    event.preventDefault()
    this.setState({
      activeTeams: [],
      inactiveTeams: [],
      newTeam: null
    })
  }
  handleDeactivateTeam = team => {
    this.setState(currentState => {
      return {
        activeTeams: currentState.activeTeams.filter(currentTeam => currentTeam !== team),
        inactiveTeams: currentState.inactiveTeams.concat([team])
      }
    })
  }
  handleActivateTeam = team => {
    this.setState(currentState => {
      return {
        activeTeams: currentState.activeTeams.concat([team]),
        inactiveTeams: currentState.inactiveTeams.filter(currentTeam => currentTeam !== team)
      }
    })
  }
  render() {
    const { activeTeams, inactiveTeams, newTeam } = this.state
    return (
      <>
        <div className='container'>
          <h1 className='m-0 p-0 my-3'>Cricket World Cup 2019</h1>
          <hr />
          <form className='form-inline' onSubmit={this.handleAddTeam}>
            <div className='input-group w-100'>
              <input
                type='text'
                placeholder='Add a Team...'
                className='form-control'
                value={newTeam}
                onChange={this.handleChange}
              />
              <div className='input-group-append'>
                <button className='btn btn-default btn-primary' type='submit'>Add Team</button>
                <button className='btn btn-default btn-danger' onClick={this.handleClearTeams}>Clear</button>
              </div>
            </div>
          </form>
          <hr />
          <h2 className='m-0 p-0 mb-3'>Teams in Competition</h2>
          <div className='cards row'>
            {
              activeTeams.map(team =>
                <>
                  <div className='col col-12 col-md-6 col-lg-4 mb-3'>
                    <div className='card p-3'>
                      <div className='card-title' index={ team }>{ team }</div>
                      <div className='button'>
                        <button className='btn btn-default btn-info mr-2' onClick={() => this.handleDeactivateTeam(team)}>Deactivate</button>
                        <button className='btn btn-default btn-dark' onClick={() => this.handleRemoveTeam(team)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          </div>
          <hr />
          <h2 className='m-0 p-0 mb-3'>Teams out of Competition</h2>
          <div className='cards row'>
            {
              inactiveTeams.map(team =>
                <>
                  <div className='col col-12 col-md-6 col-lg-4 mb-3'>
                    <div className='card p-3 mb-3 bg-danger'>
                      <div className='card-title text-white'>{ team }</div>
                      <div className='button'>
                        <button className='btn btn-default btn-dark' onClick={() => this.handleActivateTeam(team)}>Activate</button>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </>
    )
  }
}

render(<App />, document.querySelector('#root'))
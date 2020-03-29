import React from 'react'
import './Filters.css'

const Filters = (props) => {
  return (
    <div className='filters my-3 position-sticky'>
      <div className="btn-toolbar" role="toolbar" aria-label="Sort list by various options">
        <p className="m-0 p-0 mb-2 w-100 d-block text-center text-dark font-weight-bold" style={{ lineHeight: '1' }}>Sort by:</p>
        <div className='btn-group btn-group-sm flex-wrap w-100'>
          <button className="btn btn-primary" onClick={props.handleSortByName}>Name</button>
          <button className="btn btn-danger" onClick={props.handleSortByDate}>Date</button>
          <button className="btn btn-info" onClick={props.handleSortByStars}>Stars</button>
          <button className="btn btn-success" onClick={props.handleSortByForks}>Forks</button>
          <button className="btn btn-secondary" onClick={props.handleSortByIssues}>Issues</button>
          <button className="btn btn-dark" onClick={props.handleSortByWatchers}>Watchers</button>
        </div>
      </div>
    </div>
  )
}

export default Filters
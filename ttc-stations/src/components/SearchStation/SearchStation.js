import React from 'react';
import './SearchStation.css';

const SearchStation = props =>
  <>
    <section className='search-station m-0 p-0 mb-3 mb-md-4'>
      <div className='input-group input-group-lg'>
        <input type='text' className='form-control' aria-label='Search Station' placeholder='Find a Station...' onChange={e => props.searchStation(e.target.value)} />
        <div className='input-group-append'>
          <button className='btn btn-default btn-info dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Sort By:</button>
          <div className='dropdown-menu'>
            <button
              className={`dropdown-item ${props.orderBy === 'name' ? 'active' : ''}`}
              onClick={e => props.changeOrder('name', props.orderDir)}
            >Name</button>
            <div role='separator' className='dropdown-divider'></div>
            <button
              className={`dropdown-item ${props.orderDir === 'asc' ? 'active' : ''}`}
              onClick={e => props.changeOrder(props.orderBy, 'asc')}
            >Ascending</button>
            <button
              className={`dropdown-item ${props.orderDir === 'desc' ? 'active' : ''}`}
              onClick={e => props.changeOrder(props.orderBy, 'desc')}
            >Descending</button>
          </div>
        </div>
      </div>
    </section>
  </>

export default SearchStation;

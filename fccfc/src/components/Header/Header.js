import React from 'react';
import './Header.css';

const App = props => {
  const { pageInfo, totalVideosLoaded } = props;
  return (
    <>
      <header className="header">
        <div className="header__container">
          <img src="./favicon.png" alt="freeCodeCamp.org" className="header__icon" />
          <h1 className="header__title">fCCFC</h1>
        </div>
        <nav className="nav">
          {
            pageInfo && totalVideosLoaded
            ?
            <p className="nav__text">Showing <strong>{totalVideosLoaded}</strong> courses out of <strong>{pageInfo.totalResults}</strong>.</p>
            :
            <p className="nav__text">No courses available at the moment.</p>
          }
        </nav>
      </header>
    </>
  );
}

export default App;
import React from 'react';
import './Footer.css';
import { GoLinkExternal } from 'react-icons/go';

const App = () => {
  let currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <p className="footer__text">
          <a className="footer__link" href="https://www.youtube.com/playlist?list=PLWKjhJtqVAbnupwRFOq9zGOWjdvPRtCmO" target="_blank" rel="noopener noreferrer">Watch complete playlist on YouTube <GoLinkExternal /></a>
        </p>
        <p className="footer__text">&copy; {currentYear}</p>
      </footer>
    </>
  )
}

export default App;
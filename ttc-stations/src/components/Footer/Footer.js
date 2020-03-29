import React from 'react';
import './Footer.css';
import Moment from 'react-moment';

const Footer = props =>
  <>
    <footer className="footer">
      <div className='container'>
        <div className='row'>
          <div className='col col-12'>
            <p className='m-0 p-0 my-3'>&copy; <Moment date={props.currentTime} format='dddd, MMMM DD, YYYY, hh:mm:ss A' /></p>
          </div>
        </div>
      </div>
    </footer>
  </>

export default Footer;

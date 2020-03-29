import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Button = ({ handleClick, text }) => <button onClick={e => handleClick(e)} className="btn btn-primary">{text}</button>

const Quote = ({quote}) => {
  if(quote === undefined || quote.length === 0) return <div className="jumbotron"><h1 className="display-1">No quotes asked for yet!</h1></div>;
  return (
    <div className="jumbotron">
      <h1 className="display-1">{quote}</h1>
    </div>
  );
}

const App = () => {
  const [quote, setQuote] = useState([]);
  const [filter, setFilter] = useState('');
  const getQuote = flag => {
    axios
    .get(`https://cors-anywhere.herokuapp.com/http://numbersapi.com/${flag}`, { crossDomain: true })
    .then(response => {
      setQuote(response.data);
    });
  }
  const handleRandom = e => {
    e.preventDefault();
    getQuote('random');
  }
  const handleRandomByYear = e => {
    e.preventDefault();
    getQuote('random/year');
  }
  const handleRandomByMath = e => {
    e.preventDefault();
    getQuote('random/math');
  }
  const handleRandomByDate = e => {
    e.preventDefault();
    getQuote('random/date');
  }
  const handleFilter = e => {
    e.preventDefault();
    setFilter(e.target.value);
  }
  const handleFilterClick = e => {
    e.preventDefault();
    getQuote(filter);
    setFilter('');
  }
  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="d-flex justify-content-center align-content-center align-items-center flex-column col feature">
            <div className="d-flex justify-content-center align-content-center align-items-center flex-column">
              <small><label htmlFor="custom-filter" className="d-block">Enter custom filters like 5, 5/math, 5/date, 5/year, date in format mm/dd like 7/3 to get a custom fact:</label></small>
              <div className="input-group mb-0">
                <div className="input-group-prepend">
                  <button className="btn btn-primary" type="button" id="custom-filter" onClick={e => handleFilterClick(e)}>Get a fact!</button>
                </div>
                <input type="text" className="form-control custom-filter" placeholder="Enter a custom filter..." onChange={handleFilter} value={filter} name="custom-filter" />
              </div>
              <div className="m-3">OR</div>
              <div className="btn-group">
                <Button handleClick={handleRandom} text="Random" />
                <Button handleClick={handleRandomByYear} text="Random by Year" />
                <Button handleClick={handleRandomByMath} text="Random by Math" />
                <Button handleClick={handleRandomByDate} text="Random by Date" />
              </div>
              <p className="small m-2">Get interesting quotes about Numbers either randomly, based on year, math or date.</p>
            </div>
            <div className="p-3">
              <Quote quote={quote} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

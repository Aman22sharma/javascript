import React, { useState } from "react";
import Intro from "./Intro";
import SeriesList from "./SeriesList";
import Loading from "./Loading";
import "whatwg-fetch";
import { Navbar, Form, FormControl, Alert } from "react-bootstrap";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [seriesName, setSeriesName] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const handleChange = e => {
    const getSeries = async value => {
      const API = `https://api.tvmaze.com/search/shows?q=${value}`;
      const result = await fetch(API);
      const json = await result.json();
      setSeries(json);
      setIsFetching(false);
    };
    setIsFetching(true);
    setSeriesName(e.target.value);
    getSeries(e.target.value);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="bottom" className="shadow-lg">
        <Navbar.Brand>TV Series</Navbar.Brand>
        <Form inline className="ml-auto">
          <FormControl
            value={seriesName}
            type="text"
            placeholder="Enter a Series.."
            onChange={e => handleChange(e)}
          />
        </Form>
      </Navbar>
      <div className="pt-3">
        <Intro message="Find information on your most loved series!" />
        {!isFetching && series.length === 0 && seriesName.trim() === "" && (
          <Alert variant="info">
            Please enter a series name in the box below.
          </Alert>
        )}
        {!isFetching && series.length === 0 && seriesName.trim() !== "" && (
          <Alert variant="danger">No TV series found with this name.</Alert>
        )}
      </div>
      {isFetching && <Loading />}
      <SeriesList list={series} />
    </>
  );
};

export default Series;

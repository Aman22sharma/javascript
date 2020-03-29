import React, { useState, useEffect } from "react";
import moment from "moment";
import Loading from "./components/Loading";
import Menu from "./components/Menu";
import Cards from "./components/Cards";
import "./App.scss";

const App = () => {
  const [festivals, setFestivals] = useState([]);
  const [data, setData] = useState([]);
  const [filterMonth, setFilterMonth] = useState(moment(new Date()).month());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getFestivals = async () => {
      const result = await fetch(
        `https://cors-anywhere.herokuapp.com/https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/9201059e-43ed-4369-885e-0b867652feac/resource/8900fdb2-7f6c-4f50-8581-b463311ff05d/download/festivals-and-events-json-feed.json`
      );
      const json = await result.json();
      let filteredData;
      filteredData = json.filter(item => {
        return (
          moment(item.calEvent.startDate).month() === filterMonth ||
          moment(item.calEvent.endDate).month() === filterMonth
        );
      });
      setFestivals(json);
      setData(filteredData);
    };
    getFestivals();
    setLoading(false);
  }, [filterMonth]);
  const handleFilterMonth = e => {
    const newMonth = parseInt(e.target.value);
    setFilterMonth(newMonth);
    e.preventDefault();
  };
  if (loading || data === undefined || data.length === 0) return <Loading />;
  return (
    <>
      <Menu
        festivals={festivals}
        filterMonth={filterMonth}
        handleFilterMonth={handleFilterMonth}
      />
      <Cards data={data} />
    </>
  );
};

export default App;

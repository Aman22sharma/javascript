import React, { useState, useEffect } from "react";
import "../css/App.css";
import AddReporters from "./AddReporters";
import SearchReporters from "./SearchReporters";
import ListReporters from "./ListReporters";
import { without, findIndex } from "lodash";

const App = () => {
  // Read here for more info: https://tinyurl.com/yyh9y4zj
  const [reporters, setReporters] = useState([]);
  const [displayForm, setDisplayForm] = useState(true);
  const [orders, setOrders] = useState({
    orderDirection: "desc",
    orderBy: "name"
  });
  const [query, setQuery] = useState("");
  let order = orders.orderDirection === "asc" ? 1 : -1;

  let filteredReporters = reporters
    .sort((a, b) => {
      if (a[orders.orderBy].toLowerCase() < b[orders.orderBy].toLowerCase())
        return -1 * order;
      else return 1 * order;
    })
    .filter(item => {
      return (
        item["name"].toLowerCase().includes(query) ||
        item["notes"].toLowerCase().includes(query) ||
        item["channel"].toLowerCase().includes(query)
      );
    });

  useEffect(() => {
    fetch(`./db.json`)
      .then(blob => blob.json())
      .then(result => {
        const allReporters = result.map(reporter => reporter);
        setReporters([...reporters, ...allReporters]);
      })
      .catch(error => console.log(error));
  }, []);

  const toggleForm = () => {
    setDisplayForm(!displayForm);
  };

  const handleDeleteReporter = currentReporter => {
    let remainingReporters = without(reporters, currentReporter);
    setReporters(remainingReporters);
  };

  const handleAddAppointment = currentReporter => {
    currentReporter.id = reporters.length + 1;
    setReporters(reporters.concat(currentReporter));
  };

  const handleOrder = (e, orderBy, orderDirection) => {
    e.preventDefault();
    setOrders({ orderBy, orderDirection });
  };

  const handleSearch = e => {
    setQuery(e);
  };

  const updateReporter = (name, value, id) => {
    let tempReporters = reporters;
    let reporterId = findIndex(reporters, { id });
    tempReporters[reporterId][name] = value;
    setReporters([...tempReporters]);
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-sm-4">
            <div className="position-sticky">
              <SearchReporters
                orderBy={orders.orderBy}
                orderDirection={orders.orderDirection}
                handleOrder={handleOrder}
                handleSearch={handleSearch}
              />
              <AddReporters
                displayForm={displayForm}
                toggleForm={toggleForm}
                handleAddAppointment={handleAddAppointment}
              />
            </div>
          </div>
          <div className="col-12 col-sm-8">
            <div className="row">
              <ListReporters
                reporters={filteredReporters}
                handleDeleteReporter={handleDeleteReporter}
                updateReporter={updateReporter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

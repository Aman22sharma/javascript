import React from "react";

const SearchReporters = ({
  orderBy,
  orderDirection,
  handleOrder,
  handleSearch
}) => {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Search"
          placeholder="Search a reporter"
          onChange={e => handleSearch(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Search
          </button>
          <div className="dropdown-menu">
            <a
              className={
                orderBy === "name" ? "dropdown-item active" : "dropdown-item"
              }
              href="#sort"
              onClick={e => handleOrder(e, "name", orderDirection)}
            >
              Name
            </a>
            <a
              className={
                orderBy === "channel" ? "dropdown-item active" : "dropdown-item"
              }
              href="#sort"
              onClick={e => handleOrder(e, "channel", orderDirection)}
            >
              Channel
            </a>
            <div role="separator" className="dropdown-divider"></div>
            <a
              className={
                orderDirection === "asc"
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
              href="#sort"
              onClick={e => handleOrder(e, orderBy, "asc")}
            >
              Ascending
            </a>
            <a
              className={
                orderDirection === "desc"
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
              href="#sort"
              onClick={e => handleOrder(e, orderBy, "desc")}
            >
              Descending
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchReporters;

import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { uniqBy, sortBy } from "lodash";
import "./App.scss";

const Box = ({ box }) => {
  return (
    <div className="box">
      <h2
        className={`box__title ${
          box.category === "Blue Bin"
            ? "box--bb"
            : box.category === "Christmas Tree"
              ? "box--ct"
              : box.category === "Depot"
                ? "box--d"
                : box.category === "Electronic Waste"
                  ? "box--ew"
                  : box.category === "Garbage"
                    ? "box--g"
                    : box.category === "Green Bin"
                      ? "box--gb"
                      : box.category === "HHW"
                        ? "box--hhw"
                        : box.category === "Metal Items"
                          ? "box--mi"
                          : box.category === "Not Accepted"
                            ? "box--na"
                            : box.category === "Oversize"
                              ? "box--o"
                              : "box--yw"
          }`}
      >
        {box.title}
      </h2>

      {ReactHtmlParser(ReactHtmlParser(box.body))}
      <p className="box__keywords">{box.keywords}</p>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const categoryList = uniqBy(data, i => i.category);
  const uniqueList = categoryList.map(i => i.category).sort();
  useEffect(() => {
    const API = `https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000`;
    fetch(API)
      .then(r => r.json())
      .then(d => setData(d));
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <h1 className="m-0 p-0 my-3">🧙‍♂️ Waste Wizard</h1>
            <p>
              Waste Wizard provide helpful information regarding waste disposal
              scheme offered by City of Toronto to residents. This data is
              collected from City of Toronto's website.
            </p>
            <ul className="list-group mb-3 flex-row flex-wrap">
              {uniqueList.map((item, i) => (
                <li
                  key={i}
                  className={`list-group-item rounded-0 ${
                    item === "Blue Bin"
                      ? "list-group-item--bb"
                      : item === "Christmas Tree"
                        ? "list-group-item--ct"
                        : item === "Depot"
                          ? "list-group-item--d"
                          : item === "Electronic Waste"
                            ? "list-group-item--ew"
                            : item === "Garbage"
                              ? "list-group-item--g"
                              : item === "Green Bin"
                                ? "list-group-item--gb"
                                : item === "HHW"
                                  ? "list-group-item--hhw"
                                  : item === "Metal Items"
                                    ? "list-group-item--mi"
                                    : item === "Not Accepted"
                                      ? "list-group-item--na"
                                      : item === "Oversize"
                                        ? "list-group-item--o"
                                        : "list-group-item--yw"
                    }`}
                >
                  {item}
                </li>
              ))}
            </ul>
            {sortBy(data, "category").map((item, i) => (
              <Box key={i} box={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-dark">
        <div className="d-flex justify-content-center align-content-center align-items-center">
          <p className="m-3 mb-0 text-white">
            <a
              href="https://www.toronto.ca/services-payments/recycling-organics-garbage/waste-wizard/"
              target="_blank"
              rel="noopener noreferrer"
            >
              City of Toronto Docs!
            </a>
            <span className="ml-2">&copy; {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default App;

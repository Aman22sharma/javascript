import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardExpectedAvg = ({ festival }) => {
  return (
    <>
      {festival.expectedAvg ? (
        <span className="d-block">
          <span>
            <strong>Expected Audience: </strong>
          </span>
          {`${ReactHtmlParser(festival.expectedAvg)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardExpectedAvg;

import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardFrequency = ({ festival }) => {
  return (
    <>
      {festival.frequency ? (
        <span className="d-block">
          <span>
            <strong>Event Frequency: </strong>
          </span>
          {`${ReactHtmlParser(festival.frequency)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardFrequency;

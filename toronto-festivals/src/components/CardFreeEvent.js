import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardFreeEvent = ({ festival }) => {
  return (
    <>
      {festival.freeEvent ? (
        <span className="d-block">
          <span>
            <strong>Free Entry: </strong>
          </span>
          {`${ReactHtmlParser(festival.freeEvent)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardFreeEvent;

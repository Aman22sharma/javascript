import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardContactTitle = ({ festival }) => {
  return (
    <>
      {festival.contactTitle ? (
        <span className="d-block">
          <span>
            <strong>Title: </strong>
          </span>
          {`${ReactHtmlParser(festival.contactTitle)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardContactTitle;

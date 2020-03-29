import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardContactName = ({ festival }) => {
  return (
    <>
      {festival.contactName ? (
        <span className="d-block">
          <span>
            <strong>Contact: </strong>
          </span>
          {`${ReactHtmlParser(festival.contactName)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardContactName;

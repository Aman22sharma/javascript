import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardPartName = ({ festival }) => {
  return (
    <>
      {festival.partnerName ? (
        <span className="d-block">
          <span>
            <strong>Partner: </strong>
          </span>
          {`${ReactHtmlParser(festival.partnerName)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardPartName;

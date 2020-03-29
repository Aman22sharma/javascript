import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardOrgAddr = ({ festival }) => {
  return (
    <>
      {festival.orgAddress ? (
        <span className="d-block">
          <span>
            <strong>Address: </strong>
          </span>
          {`${ReactHtmlParser(festival.orgAddress)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardOrgAddr;

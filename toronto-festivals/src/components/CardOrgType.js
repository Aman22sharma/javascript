import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardOrgType = ({ festival }) => {
  return (
    <>
      {festival.orgType ? (
        <span className="d-block">
          <span>
            <strong>Type: </strong>
          </span>
          {`${ReactHtmlParser(festival.orgType)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardOrgType;

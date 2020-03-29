import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardOrgName = ({ festival }) => {
  return (
    <>
      {festival.orgName ? (
        <span className="d-block">
          <span>
            <strong>Organization: </strong>
          </span>
          {`${ReactHtmlParser(festival.orgName)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardOrgName;

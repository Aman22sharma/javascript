import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardAccessibility = ({ festival }) => {
  return (
    <>
      {festival.accessibility ? (
        <span className="d-block">
          <span>
            <strong>Accessibility Services: </strong>
          </span>
          {`${ReactHtmlParser(festival.accessibility)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardAccessibility;

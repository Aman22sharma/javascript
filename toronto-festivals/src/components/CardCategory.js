import React from "react";
import { Badge } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

const CardCategory = ({ festival, categories }) => {
  return (
    <>
      {festival.categoryString ? (
        <span className="d-block">
          <span>
            <strong>Category: </strong>
          </span>
          {categories.map((i, k) => (
            <Badge key={k} variant="primary" className="mr-2">
              {ReactHtmlParser(i)}
            </Badge>
          ))}
        </span>
      ) : null}
    </>
  );
};

export default CardCategory;

import React from "react";
import { ListGroup } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

const CardDesc = ({ festival }) => {
  return (
    <>
      {festival.description ? (
        <ListGroup variant="flush">
          <ListGroup.Item className="text-capitalize" variant="dark">
            {ReactHtmlParser(festival.description)}
          </ListGroup.Item>
        </ListGroup>
      ) : null}
    </>
  );
};

export default CardDesc;

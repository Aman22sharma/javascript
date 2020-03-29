import React from "react";
import {
  Badge,
} from "react-bootstrap";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import {
  FaBars,
  FaCanadianMapleLeaf
} from "react-icons/fa";

const Toggle = ({ festival }) => {
  return (
    <div>
      <div className="mb-3 d-flex justify-content-start align-content-center align-items-center">
        <span className="d-flex mr-2">
          <FaCanadianMapleLeaf />
        </span>
        <span>{ReactHtmlParser(festival.eventName)}</span>
      </div>
      <div className="d-flex justify-content-between align-content-end align-items-end">
        <div>
          <div>
            <Badge variant="success">
              {`From: ${moment(festival.startDate).format(
                "dddd, MMMM D, YYYY"
              )}`}
            </Badge>
          </div>
          <div>
            <Badge variant="danger" className="mt-2">
              {`To: ${moment(festival.endDate).format("dddd, MMMM D, YYYY")}`}
            </Badge>
          </div>
        </div>
        <div>
          <FaBars />
        </div>
      </div>
    </div>
  );
};

export default Toggle;

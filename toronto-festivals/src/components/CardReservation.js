import React from "react";
import ReactHtmlParser from "react-html-parser";

const CardReservation = ({ festival }) => {
  return (
    <>
      {festival.reservationsRequired ? (
        <span className="d-block">
          <span>
            <strong>Reservations Required: </strong>
          </span>
          {`${ReactHtmlParser(festival.reservationsRequired)}`}
        </span>
      ) : null}
    </>
  );
};

export default CardReservation;

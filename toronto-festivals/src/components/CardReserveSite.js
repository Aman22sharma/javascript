import React from "react";
import { Button } from "react-bootstrap";
import { FaRunning } from "react-icons/fa";

const CardReserveSite = ({ festival }) => {
  return (
    <>
      {festival.reservation && festival.reservation.website ? (
        <Button
          size="sm"
          variant="danger"
          href={`${festival.reservation.website}`}
        >
          <FaRunning />
        </Button>
      ) : null}
    </>
  );
};

export default CardReserveSite;

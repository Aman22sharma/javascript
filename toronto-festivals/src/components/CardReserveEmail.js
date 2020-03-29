import React from "react";
import { Button } from "react-bootstrap";
import { FaInbox } from "react-icons/fa";

const CardReserveEmail = ({ festival }) => {
  return (
    <>
      {festival.reservation && festival.reservation.email ? (
        <Button
          size="sm"
          variant="warning"
          href={`mailto:${festival.reservation.email}`}
        >
          <FaInbox />
        </Button>
      ) : null}
    </>
  );
};

export default CardReserveEmail;

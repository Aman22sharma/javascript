import React from "react";
import { Button } from "react-bootstrap";
import { IoIosCall } from "react-icons/io";

const CardReservePhone = ({ festival }) => {
  return (
    <>
      {festival.reservation && festival.reservation.phone ? (
        <Button
          size="sm"
          variant="info"
          href={`tel:${festival.reservation.phone}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoIosCall />
        </Button>
      ) : null}
    </>
  );
};

export default CardReservePhone;

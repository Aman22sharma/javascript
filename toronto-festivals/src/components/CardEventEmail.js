import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";

const CardEventEmail = ({ festival }) => {
  return (
    <>
      {festival.eventEmail ? (
        <Button
          size="sm"
          variant="secondary"
          href={`mailto:${festival.eventEmail}`}
        >
          <AiOutlineMail />
        </Button>
      ) : null}
    </>
  );
};

export default CardEventEmail;

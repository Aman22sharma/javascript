import React from "react";
import { Button } from "react-bootstrap";
import { FaInternetExplorer } from "react-icons/fa";

const CardEventSite = ({ festival }) => {
  return (
    <>
      {festival.eventWebsite ? (
        <Button
          size="sm"
          variant="primary"
          href={festival.eventWebsite}
          target="_blank"
        >
          <FaInternetExplorer />
        </Button>
      ) : null}
    </>
  );
};

export default CardEventSite;

import React from "react";

const CardOrgPhone = ({ festival }) => {
  return (
    <>
      {festival.orgPhone ? (
        <span className="d-block">
          <span>
            <strong>Phone: </strong>
          </span>
          <a href={`tel:${festival.orgPhone}`}>{festival.orgPhone}</a>
        </span>
      ) : null}
    </>
  );
};

export default CardOrgPhone;

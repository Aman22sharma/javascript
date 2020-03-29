import React from "react";

const CardOrgEmail = ({ festival }) => {
  return (
    <>
      {festival.orgEmail ? (
        <span className="d-block">
          <span>
            <strong>Email: </strong>
          </span>
          <a href={`mailto:${festival.orgEmail}`} className="text-lowercase">
            {festival.orgEmail}
          </a>
        </span>
      ) : null}
    </>
  );
};

export default CardOrgEmail;

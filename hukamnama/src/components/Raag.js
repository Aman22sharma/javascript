import React from "react";

const Raag = ({ raag }) => {
  return (
    <p className="m-0">
      <span>{`${raag.english}`}</span>
      <span className="mx-2">|</span>
      <span className="punjabi">{`${raag.unicode}`}</span>
    </p>
  );
};

export default Raag;

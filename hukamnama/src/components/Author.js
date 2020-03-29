import React from "react";

const Author = ({ author }) => {
  return (
    <p className="m-0">
      <span>{`${author.english}`}</span>
      <span className="mx-2">|</span>
      <span className="punjabi">{`${author.unicode}`}</span>
    </p>
  );
};

export default Author;

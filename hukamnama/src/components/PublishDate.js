import React from "react";

const PublishDate = ({ date, language }) => {
  let parent;
  switch (language) {
    case "PB":
      parent = "punjabi";
      break;
    default:
      break;
  }
  return <p className={`m-0 ${parent}`}>{`${date.day}, ${date.date} ${date.month}, ${date.year}`}</p>;
};

export default PublishDate;

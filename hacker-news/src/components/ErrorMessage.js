import React from "react";

const ErrorMessage = ({ error }) => {
  return <p>Error: {JSON.stringify(error)}</p>;
};

export default ErrorMessage;

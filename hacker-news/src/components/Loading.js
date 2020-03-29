import React from "react";
import Spinner from "react-spinkit";

const Loading = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center align-content-center">
      <Spinner name="double-bounce" />
    </div>
  );
};

export default Loading;

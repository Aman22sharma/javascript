import React from "react";
import Spinner from "react-spinkit";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-content-center align-items-center min-vh-100">
      <Spinner name="ball-scale-ripple-multiple" />
    </div>
  );
};

export default Loading;

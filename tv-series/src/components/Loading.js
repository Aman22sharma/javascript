import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center align-content-center vh-100">
      <img src={loading} alt="Loading..." className="w-25 mx-auto" />;
    </div>
  );
};

export default Loading;

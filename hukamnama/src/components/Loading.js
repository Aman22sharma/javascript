import React from "react";
import { ReactComponent as Logo } from "../images/loading.svg";

const Loading = () => {
  return <div className="loading d-flex justify-content-center align-content-center align-items-center w-100 h-100"><Logo /></div>;
};

export default Loading;

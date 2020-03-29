import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const notes = [
  {
    text: "Buy 2L Milk 🥛",
    isComplete: false
  },
  {
    text: "Buy 1kg Tomatoes 🍅",
    isComplete: false
  },
  {
    text: "Buy Maggi Noodles 5 packets 🍲",
    isComplete: false
  }
];

ReactDOM.render(<App notes={notes} />, document.getElementById("root"));

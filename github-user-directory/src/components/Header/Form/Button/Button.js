import React from "react";

const Button = props => (
  <button
    type="submit"
    className="btn btn-default btn-secondary"
    disabled={props.disabled}
  >Search</button>
);

export default Button;

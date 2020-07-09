import React from "react";
import "./DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtn(props) {
  return (
    <span className="btn btn-primary" {...props} role="button" tabIndex="0">
    </span>
  );
}



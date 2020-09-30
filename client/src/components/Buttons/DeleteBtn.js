import React from "react";
import "./style.css";

export function DeleteBtn(props) {
  return (
    <span style={{ marginLeft:5}} {...props}  role="button" tabIndex="0"> {props.children}
    </span>
  );
}



import React from "react";
import "./style.css";

export function DeleteBtn(props) {
  return (
    <span className="delete-btn" style={{ marginLeft:5}} {...props}  role="button" tabIndex="0">
      <i className="material-icons">remove_circle_outline</i>
      
    </span>
  );
}



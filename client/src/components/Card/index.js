import React from "react";
import "./style.css";

function Card(props) {
  return (
    <div className="profile-picture col" role="img">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
}

export default Card;

import React from "react";
import "./style.css";


function Nav(props) {
  const logout = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  const isAuthenticated = JSON.parse(localStorage.getItem("tokens"));
  return (
  
    <nav className="navbar">
        <img src="https://img.icons8.com/ios-filled/150/ffffff/deadlift.png"/>
        {props.title}
        {isAuthenticated ? <button className="btn" onClick={() => logout()}><img src="https://img.icons8.com/ios-filled/50/ffffff/exit.png"/></button> : ""}
    </nav>
  );
}

export default Nav;

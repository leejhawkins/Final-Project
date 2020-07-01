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

      <a className="navbar" href="/">{props.title}</a>


      {isAuthenticated ? <button onClick={() => logout()}>logout</button> : ""}
    
    </nav>
  );
}

export default Nav;

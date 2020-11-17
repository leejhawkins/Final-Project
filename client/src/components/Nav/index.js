import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Nav(props) {
  const logout = () => { 
    localStorage.clear();
    window.location.assign("/");
  };
  const isAuthenticated = JSON.parse(localStorage.getItem("tokens"));
  if (isAuthenticated) {
    var userLink = "/users/" + isAuthenticated.userName
    var gymLink = "/gyms/" + isAuthenticated.gym
  }
 
  return (
  
    <header className="navbar navbar-expand-lg flex-column flex-md-row">
      <a className="navbar-brand mr-0 mr-md-2" href="/">Collective Fitness </a>
        {userLink && gymLink ? (
        
        <ul className="navbar-nav ml-md-auto" >
           
          <li className="nav-item">
            <Link 
              to={"/users/" + isAuthenticated.userName} className={window.location.pathname === userLink ? "nav-link active" : "nav-link"}>
              Home
              <i className="material-icons">home</i>
        </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/gyms/" + isAuthenticated.gym}
              className={window.location.pathname === gymLink ? "nav-link active" : "nav-link"}
            >
              {isAuthenticated.gym} 
              <i className="material-icons">fitness_center</i>
        </Link>
          </li>
          <li className="nav-item">
              
            <Link 
            to={"/users/" + isAuthenticated.userName} className={window.location.pathname === userLink ? "nav-link active" : "nav-link"}
            className="nav-link" onClick={() => logout()}>Log Out<i className="material-icons">login</i> </Link>
          </li>
        </ul>
      ):("")}
      


    </header>
  );
}


export default Nav;

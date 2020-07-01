import React from "react";
import { Link } from "react-router-dom";
import User from "../pages/User/User"
import Log from "../pages/Log/Log"
import Workouts from "../pages/Workouts/Workouts"
import Stats from "../pages/Stats/Stats"
import "../components/Nav/style.css";

function NavTabs() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/User"
          className={window.location.pathname === "/User" ? "nav-link active" : "nav-link"}
        >
          User
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Workouts"
          className={window.location.pathname === "/Workouts" ? "nav-link active" : "nav-link"}
        >
          Workouts
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Stats"
          className={window.location.pathname === "/Stats" ? "nav-link active" : "nav-link"}
        >
          Stats
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Log"
          className={window.location.pathname === "/Log" ? "nav-link active" : "nav-link"}
        >
          Log
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;

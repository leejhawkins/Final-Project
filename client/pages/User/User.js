import React from "react";
import "./User.css";
import Stats from "../Stats/Stats"
import Workouts from "../Workouts/Workouts"
import Log from "../Log/Log"

function User(props) {
  return (
    <div>
    <h1>Select Workouts for the Week</h1>
    <p></p>
    <Link to={`${props.match.url}/User`} role="button" className="btn btn-link">
        Learn More
      </Link>{" "}
      <Link to="/User" role="button" className="btn btn-link">
        Learn Less
      </Link>
      <Route exact path={`${props.match.url}/Log`} component={Log} />
      <Route exact path={`${props.match.url}/Stats`} component={Stats} />
      <Route exact path={`${props.match.url}/Workouts`} component={Workouts} />
    </div>
    );
  };

export default User;

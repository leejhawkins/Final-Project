import React from "react";
import "./Stats.css";
import Log from "../Log/Log";
import Workouts from "../Workouts/Workouts"
import User from "../User/User"


function Stats(props) {
  return (
    <div>
    <h1>User Weekly Stats</h1>
    <p></p>
    <Link to={`${props.match.url}/Stats`} role="button" className="btn btn-link">
        Learn More
      </Link>{" "}
      <Link to="/Stats" role="button" className="btn btn-link">
        Learn Less
      </Link>
      <Route exact path={`${props.match.url}/Log`} component={Log} />
      <Route exact path={`${props.match.url}/Workouts`} component={Workouts} />
      <Route exact path={`${props.match.url}/User`} component={User} />
    </div>
    );
  };
export default Stats;

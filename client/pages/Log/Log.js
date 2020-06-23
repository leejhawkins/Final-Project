import React from "react";
import "./Log.css";
import Stats from "../Stats/Stats"
import Workouts from "../Workouts/Workouts"
import User from "../User/User"

function Log(props) {
   return (

    <div>
    <h1>User Workout Log</h1>
    <p></p>
    <Link to={`${props.match.url}/Log`} role="button" className="btn btn-link">
        Learn More
      </Link>{" "}
      <Link to="/Log" role="button" className="btn btn-link">
        Learn Less
      </Link>
      <Route exact path={`${props.match.url}/Stats`} component={Stats} />
      <Route exact path={`${props.match.url}/Workouts`} component={Workouts} />
      <Route exact path={`${props.match.url}/User`} component={User} />

    </div>
    );
  };

export default Log;


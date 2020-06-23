import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import User from "../pages/User/User"
import Log from "../pages/Log/Log"
import Workouts from "../pages/Workouts/Workouts"
import Stats from "../pages/Stats/Stats"

function App() {
    return (
        <Router>
      <div>
        <NavTabs />
        <Route exact path="/" component={User} />
        <Route exact path="/User" component={User} />
        <Route exact path="/Log" component={Log} />
        <Route exact path="/Workouts" component={Workouts} />
        <Route path="/Stats" component={Stats} />
      </div>
    </Router>
      );
  }

export default App;

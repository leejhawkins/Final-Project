import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LogIn from "./pages/LogIn";
import NoMatch from "./pages/NoMatch";
import NewUser from "./pages/NewUser";
import Gym from "./pages/Gyms";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import {AuthContext} from "./context/auth";
import Nav from "./components/Nav/index";
import "./App.css";
// import NavTabs from "./components/NavTabs";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  return (
    <AuthContext.Provider value={existingTokens}>
      <Nav title="X'r Fit" />
      {/* <NavTabs/> */}
      <Router>
        <div className="h100">
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/new-user" component={NewUser} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/Dashboards/:name" componetn={Gym} />
            <ProtectedRoute exact path="/users/:name" />

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

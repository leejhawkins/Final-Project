import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LogIn from "./pages/LogIn";
import NoMatch from "./pages/NoMatch";
import NewUser from "./pages/NewUser";
import Gym from "./pages/Gyms"
import ProtectedRoute from "./ProtectedRoute";
import {AuthContext} from "./context/auth";
import Nav from "./components/Nav/index";
// import NavTabs from "./components/NavTabs";


function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  return (
    <AuthContext.Provider value={existingTokens}>
     
      {/* <NavTabs/> */}
      <Router>
        <div>
          <Nav/>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/new-user" component={NewUser} />
            <Route exact path="/gyms/:name" component={Gym}/>
            <ProtectedRoute exact path="/users/:name"/>

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

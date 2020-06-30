import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LogIn from "./pages/LogIn";
import NoMatch from "./pages/NoMatch";
import NewUser from "./pages/NewUser"
import ProtectedRoute from "./ProtectedRoute"
import { AuthContext} from "./context/auth";



function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  return (
    <AuthContext.Provider value={existingTokens}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/new-user" component={NewUser} />
          <ProtectedRoute />

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

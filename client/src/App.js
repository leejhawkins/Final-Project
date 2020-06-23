
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import User from "./pages/Users";
import LogIn from "./pages/LogIn";
import NoMatch from "./pages/NoMatch";
import NewUser from "./pages/NewUser"
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/new-user" component={NewUser} />
          <Route exact path="/users/:id" component={User} />

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;

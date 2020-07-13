import React from "react";
import { Route, Redirect } from "react-router-dom";
import User from "./pages/Users";
import LogIn from "./pages/LogIn";

function AuthenticatedRoute(props) {
    var isAuthenticated = JSON.parse(localStorage.getItem("tokens"));

    return (
        <div>
            {!isAuthenticated ? (
                <Route to={props.path} component={LogIn} />
            ) : (
                    <Redirect to = {"/users/"+isAuthenticated.userName} component={User} />
                    
                )


            };
        </div>


    )

}
export default AuthenticatedRoute;
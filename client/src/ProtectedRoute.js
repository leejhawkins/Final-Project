import React from "react";
import { Route, Redirect } from "react-router-dom";


function ProtectedRoute(props) {
    var usersLink = ""
    const isAuthenticated = JSON.parse(localStorage.getItem("tokens"));
    if (isAuthenticated) {
        usersLink = "/users/" + isAuthenticated.userName
    } 
  
    
    return (
        <div>
            {window.location.pathname===usersLink ? (
                <Route exact path={props.path} component={props.component} />
            ) : (
                    <Redirect to={props.redirect} />
                )


            };
        </div>


    )

}
export default ProtectedRoute;
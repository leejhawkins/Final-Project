import React from "react";
import { Route, Redirect } from "react-router-dom";


function ProtectedRoute(props) {
    const isAuthenticated = JSON.parse(localStorage.getItem("tokens"));
    const userLink = "/users/"+isAuthenticated.userName
    
    return (
        <div>
            {window.location.pathname===userLink ? (
                <Route exact path={props.path} component={props.component} />
            ) : (
                    <Redirect to={props.redirect} />
                )


            };
        </div>


    )

}
export default ProtectedRoute;
import React from "react";
import { Route, Redirect } from "react-router-dom";


function ProtectedRoute(props) {
    const isAuthenticated = JSON.parse(localStorage.getItem("tokens"));

    return (
        <div>
            {isAuthenticated ? (
                <Route exact path={props.path} component={props.component} />
            ) : (
                    <Redirect to={props.redirect} />
                )


            };
        </div>


    )

}
export default ProtectedRoute;
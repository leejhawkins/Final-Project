import React from "react";
import { Route, Redirect } from "react-router-dom";
import User from "./pages/Users";


function ProtectedRoute() {
    const isAuthenticated = JSON.parse(localStorage.getItem("tokens"));
    

    return (

        <div>
            {isAuthenticated ? (
                <Route exact path="/users/:name" component={User} />
            ) : (
                    <Redirect to="/" />
                )


            };
        </div>


    )

}
export default ProtectedRoute;
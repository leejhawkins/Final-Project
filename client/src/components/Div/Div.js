import React from "react";


function Div(props) {
    return (
        <div className="log-workout">
            <h5>{props.title}</h5>
            <hr></hr>
            {props.children}
        </div>
    )
}

export default Div; 


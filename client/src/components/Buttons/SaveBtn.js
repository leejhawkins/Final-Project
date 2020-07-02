import React from "react";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function SaveBtn(props) {
    return (
        <span {...props} role="button" tabIndex="0" style={{float:"right"}}>
            Add Movement<i className="material-icons">queue</i>
        </span>
    );
}



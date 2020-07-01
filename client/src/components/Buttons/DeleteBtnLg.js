import React from "react";
import "./DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtnLg(props) {
    return (
        <span className="btn btn-danger" {...props} role="button" tabIndex="0">
            Remove from List<i class="material-icons">remove_circle</i>
        </span>
    );
}
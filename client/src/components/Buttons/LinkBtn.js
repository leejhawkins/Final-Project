import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function LinkBtn(props) {
    return (
        <span {...props} role="button" style={{float:"right"}}>
            Link <i class="material-icons">link</i>
        </span>
    );
}
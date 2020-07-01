import React from "react";
<<<<<<< HEAD
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function SaveBtn(props) {
    return (
        <span {...props} role="button" tabIndex="0" style={{float:"right"}}>
            Add Movement<i class="material-icons">queue</i>
        </span>
    );
}


=======
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <span className="save-btn" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default SaveBtn;
>>>>>>> origin/logout

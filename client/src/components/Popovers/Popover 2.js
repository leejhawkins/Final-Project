import React from "react";
import Popover from "react-bootstrap/Popover"

function PopoverOther() {
    return (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Popover right</Popover.Title>
            <Popover.Content>
                And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
        </Popover>
    )
    
} 

export default PopoverOther
import React from "react";
import {Calendar} from 'react-calendar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import PopoverOther from "./Popover"
import Button from "react-bootstrap/Button"


function CalendarPopover() {
    
    return (
        <OverlayTrigger trigger="click" placement="right" overlay={PopoverOther}>
            <Button variant="success">Click me to see</Button>
        </OverlayTrigger>
        
   
    )
}

export default CalendarPopover

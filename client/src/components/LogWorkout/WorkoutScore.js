import React from "react";
import { Row } from "../Grid";
import { Input} from "../Form";

const WorkoutScore = (props) => {

    return (
        <Row className="div-wod-score">
            <div className="div-wod-title">{props.workoutType === "For Time" ? "Time: " : "Score: "}</div>
            <Input className="wod-score-input"
                value={props.minutes}
                onChange={(event)=>props.handleChange(event)}
                name="minutes"
                placeholder={props.workoutType === "For Time" ? "Minutes" : "Rounds"}
            />
            <h6>{props.workout === "For Time" ? " : " : " + "}</h6>

            <Input className="wod-score-input"
                value={props.seconds}
                onChange={(event)=>props.handleChange(event)}
                name="seconds"
                placeholder={props.workoutType === "For Time" ? "Seconds" : "Reps"}
            />
        </Row>
    )
}

export default WorkoutScore

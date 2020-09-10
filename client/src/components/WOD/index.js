import React from "react"
import moment from 'moment';

function WOD(props) {
    return (
        <div>
            <p>{moment(props.wod.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</p>
            {props.wod.workoutType === "For Time"
                ? <p>{props.wod.workoutType} {props.wod.rounds} Rounds</p>
                : <p>{props.wod.workoutType} for {props.wod.rounds} minutes</p>}
            {props.wod.movements.map(movement => (
                <p>
                    {movement.reps} {movement.movementType === "cardio" ? "m" : "x"} {movement.name}  {movement.movementType === "weight" ? `at ${movement.weight} lbs` : ""}{movement.movementType === "to height" ? `at ${movement.weight} inches` : ""}
                </p>
            ))}
        </div>
    )
}
export default WOD
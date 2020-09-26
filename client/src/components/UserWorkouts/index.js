import React from "react";
import { Col, Row } from "../Grid";
import { DeleteBtn } from "../Buttons/DeleteBtn"
import moment from 'moment';

function UserWorkouts(props) {
    return (
        <div className="row workout-row" key={props.workout._id}>
            <Col size="md-6" >
                <p>{moment(props.workout.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</p>
                {props.workout.workoutType === "AMRAP" ? <p>{props.workout.workoutType} for {props.workout.rounds} minutes of: </p> : <p>{props.workout.workoutType} {props.workout.rounds} rounds of: </p>}
                {props.workout.movements.map((movement, i) => (
                 <p> {movement.reps} {movement.movementType === "cardio" ? " m " : movement.movementType === "cal cardio" ? "cal" :" x "}
                        {movement.name}
                        {movement.movementType === "weight" ? ` at ${movement.weight} lbs` : movement.movementType === "to height" ? ` at ${movement.weight} inches` : ""}
                        {(props.workout.movements.length - 1) === i ? "" : ","}
                    </p>
                ))}
            </Col>
            <Col size="md-6">
                {props.workout.scores.map(score =>
                    <div>
                        <Row>
                            <Col size="md-6">
                                    <>
                                     {props.getUserScore(props.workout,score.score)}
                                    </>
                            </Col>
                            <Col size="md-6">
                                <DeleteBtn onClick={() => props.deleteWorkout(props.workout._id, props.workout.createdBy, score._id)} workout="Score">Delete<i className="material-icons">cancel</i></DeleteBtn>
                            </Col>
                        </Row>
                    </div>
                )}
            </Col>
        </div>

    )
}

export default UserWorkouts
import React, { useState } from "react";
import { Col, Row } from "../Grid";
import { DeleteBtn, UpdateBtn } from "../Buttons"
import moment from 'moment';
import { FormBtn } from "../Form";
import WorkoutScore from "../LogWorkout/WorkoutScore"

function UserWorkouts(props) {
    return (
        <div className="row workout-row" key={props.workout._id}>
            <Col size="md-5" >
                <p>{moment(props.workout.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</p>
                {props.workout.workoutType === "AMRAP" ? <p>{props.workout.workoutType} for {props.workout.rounds} minutes of: </p> : <p>{props.workout.workoutType} {props.workout.rounds} rounds of: </p>}
                {props.workout.movements.map((movement, i) => (
                    <p> {movement.reps} {movement.movementType === "cardio" ? " m " : movement.movementType === "cal cardio" ? "cal" : " x "}
                        {movement.name}
                        {movement.movementType === "weight" ? ` at ${movement.weight} lbs` : movement.movementType === "to height" ? ` at ${movement.weight} inches` : ""}
                        {(props.workout.movements.length - 1) === i ? "" : ","}
                    </p>
                ))}
            </Col>
            <Col size="md-7">
                {props.workout.scores.map(score =>
                    <div>
                        <Row>
                            {props.user.userName === score.userName ? (
                                <>
                                    <Col size="md-4">

                                        <>
                                            {props.getUserScore(props.workout, score.score)}
                                        </>

                                    </Col>
                                    <Col size="md-8">
                                       
                                        <DeleteBtn 
                                            onClick={() => props.deleteWorkout(props.workout._id, props.workout.createdBy, score._id)} 
                                            className="delete-btn" >
                                            Delete<i className="material-icons">cancel</i>
                                        </DeleteBtn>
                                        <UpdateBtn onClick={(event) => props.handleInputChange(event)} 
                                            name="edit" 
                                            value={props.workout._id}  
                                            >
                                                Edit Score<i className="material-icons">edit</i>
                                        </UpdateBtn>

                                    </Col>
                                </>
                            ) : ("")}
                            
                        </Row>
                        {props.edit === props.workout._id && score.userName===props.user.userName ? (
                            <div id="edit-score">
                                <WorkoutScore
                                    workoutType={props.workout.workoutType}
                                    seconds={props.seconds}
                                    minutes={props.minutes}
                                    handleChange={(event) => props.handleInputChange(event)}
                                />
                                <div>
                                    <FormBtn
                                        className="submit"
                                        disabled={!(props.seconds && props.minutes)}
                                        onClick={() => {
                                            props.editScore(props.workout, score._id)
                                        }}

                                    >Submit Score
                                    </FormBtn>
                                </div>
                            </div>
                        ) : ("")}

                    </div>

                )}

            </Col>
        </div>

    )
}

export default UserWorkouts
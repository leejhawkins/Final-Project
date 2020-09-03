import React from "react";
import { Col, Row } from "../Grid";
import { DeleteBtn } from "../Buttons/DeleteBtn"
import moment from 'moment';

function UserWorkouts(props) {

return (
    <div>
        {props.workouts.length ? (
            <div>
                {props.workouts.map(workout => (

                    <div className="row workout-row" key={workout._id}>
                        <Col size="md-6" >
                            <p>{moment(workout.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</p>

                            {workout.workoutType === "AMRAP" ? <p>{workout.workoutType} for {workout.rounds} minutes of: </p> : <p>{workout.workoutType} {workout.rounds} rounds of: </p>}


                            {workout.movements.map((movement, i) => (

                                <p> {movement.reps} {movement.movementType === "cardio" ? " m " : " x "}
                                    {movement.name}
                                    {movement.movementType === "weight" ? ` at ${movement.weight} lbs` : ""}
                                    {movement.movementType === "to height" ? ` at ${movement.weight} inches` : ""}
                                    {(workout.movements.length - 1) === i ? "" : ","}
                                </p>
                            ))}
                        </Col>
                        <Col size="md-6">


                            {workout.scores.map(score =>
                                <div>
                                    {score.userName === props.user.userName && workout.workoutType === "For Time" ? (
                                        <Row>
                                            <Col size="md-6"><p>Time:{Math.floor(score.score / 60)}:{(score.score % 60) < 10 ? "0" + score.score % 60 : score.score % 60}</p>
                                            </Col>
                                            <Col size="md-6">   <DeleteBtn onClick={() => this.props.deleteWorkout(workout._id, workout.createdBy, score._id)} workout="Time">
                                                Delete<i className="material-icons">cancel</i></DeleteBtn>
                                            </Col>
                                        </Row>
                                    ) : ("")}


                                    {score.userName === props.user.userName && workout.workoutType === "AMRAP" ? (
                                        <Row>
                                            <Col size="md-6">
                                                <p>Score: {Math.floor(score.score / props.getRoundLength(workout.movements))} Rounds + {score.score % props.getRoundLength(workout.movements)} Reps</p>
                                            </Col>
                                            <Col size="md-6">
                                                <DeleteBtn onClick={() => props.deleteWorkout(workout._id, workout.createdBy, score._id)} workout="Score">Delete<i className="material-icons">cancel</i></DeleteBtn>
                                            </Col>
                                        </Row>) : ("")}
                                </div>

                            )}
                        </Col>
                    </div>
                ))}
            </div>
        ) : ("")
        }
    </div>
)}

export default UserWorkouts
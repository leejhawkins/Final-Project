import React from "react";
import { Input, FormBtn, Dropdown, Option } from "../Form";
import { SaveBtn } from "../Buttons/SaveBtn"
import { List } from "../List"
import { Col, Row } from "../Grid";
import WorkoutScore from "./WorkoutScore"
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function LogWorkouts (props)  {
    return (
        <form id="log-workouts">
            <Row>
                <Dropdown className="dropdown"
                    value={props.workoutType}
                    onChange={(event)=>props.handleInputChange(event)}
                    name="workoutType"
                    placeholder="Workout"
                >
                    <Option selected disabled value="" name="Workout Type" />
                    <Option name="For Time" />
                    <Option name="AMRAP" />
                </Dropdown>
            </Row>
            {props.workoutType ? (
                <div className="log-workouts">
                    <div> Change Date:
                        <DatePicker
                            className="datepicker btn"
                            onChange={props.changeDate}
                        />
                        {moment(props.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}

                    </div>
                    <hr></hr>
                    <Row>
                        <Input className="wod-score-input"
                            value={props.rounds}
                            onChange={(event)=>props.handleInputChange(event)}
                            name="rounds"
                            placeholder={props.workoutType === "For Time" ? "Rounds: " : "Time"}
                        />
                        {props.workoutType === "For Time" ? "Rounds" : "Minutes"}
                    </Row>
                    {props.movementArray.length ? (
                        <List>

                            {props.movementArray.map(movement => (
                                <Row>
                                    <Col size="md-4">
                                        <p>{movement.reps} {movement.movementType === "cardio" ? "m" : "x"} </p>
                                    </Col>
                                    <Col size="md-4">
                                        <p>{movement.name}</p>
                                    </Col>
                                    {movement.movementType === "weight" || movement.movementType === "to height" ? (
                                        <Col size="md-4">
                                            {movement.movementType === "weight" ? <p>at {movement.weight} lbs</p> : <p>to {movement.weight} inches</p>}
                                        </Col>
                                    ) : ("")}
                                </Row>
                            ))}
                        </List>
                    ) : ("")}
                    <hr></hr>
                    <Row>
                        <Dropdown
                            className="dropdown"
                            value={props.movementName}
                            onChange={(event) => props.handleMovementChange(event)}
                            name="movementName"
                            placeholder="Movement"
                        >
                            <Option selected disabled value="" name="Add Movement" />
                            {props.movements.map(movement => (
                                <Option name={movement.name} key={movement._id} />
                            ))}
                        </Dropdown>
                    </Row>
                    {props.movementName ? (
                        <Row>
                            <Input className="wod-score-input"
                                value={props.reps}
                                onChange={(event) => props.handleInputChange(event)}
                                name="reps"
                                placeholder={props.movementType === "cardio" ? "Distance" : "Reps"}
                            />
                            {props.movementType === "weight" || props.movementType === "to height" ? (
                                <Input className="wod-score-input"
                                    value={props.weight}
                                    onChange={(event)=>props.handleInputChange(event)}
                                    name="weight"
                                    placeholder={props.movementType === "weight" ? "Weight" : "Height"}

                                />
                            ) : ("")}
                            <Row>
                                <SaveBtn class="submit-movement"
                                    disabled={!(props.movementName && props.reps)}
                                    onClick={() => props.addMovement()} />
                            </Row>
                        </Row>


                    ) : ("")}
                    <hr></hr>
                    <WorkoutScore
                        workoutType={props.workoutType}
                        seconds={props.seconds}
                        minutes={props.minutes}
                        handleChange={(event)=>props.handleInputChange(event)}
                    />
                    <FormBtn
                        className="logscore"
                        disabled={!(props.workoutType && props.rounds && props.movementArray && props.minutes)}
                        onClick={() => {
                            props.handleFormSubmit(
                                props.date,
                                props.workoutType,
                                props.rounds,
                                props.movementArray,
                                props.minutes,
                                props.seconds,
                            )
                        }
                        }
                    >Log Workout</FormBtn>
                </div>

            ) : ("")}

        </form>
    );
}

export default LogWorkouts



   
  
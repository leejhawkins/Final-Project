import React from "react";
import { Input, FormBtn, Dropdown, Option } from "../Form";
import { SaveBtn } from "../Buttons/SaveBtn"
import { List } from "../List"
import { Col, Row } from "../Grid";
import WorkoutScore from "./WorkoutScore"
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class LogWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY-MM-DD"),
            workoutType: "",
            rounds: "",
            movementName: "",
            reps: "",
            weight: "",
            movementType: "",
            movementArray: [],
            minutes: "",
            seconds: "",
        };
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };
    handleMovementChange = event => {
        const { name, value } = event.target;
        let movement = this.props.movements.find(movement => movement.name === value )
        console.log(movement)
        this.setState({
            [name]: value,
            movementType: movement.type
        });
    };
    addMovement = () => {
        if (this.state.movementName && this.state.reps) {
            const movement = { name: this.state.movementName, reps: this.state.reps, weight: this.state.weight, movementType: this.state.movementType }
            const movementArray = this.state.movementArray
            movementArray.push(movement)
            console.log(movementArray)
            this.setState({ movementArray: movementArray, movementName: "", reps: "", weight: "", movementType: "" })
        }
    }
    changeDate = date => {
        console.log(date)
        this.setState({ date })
    }

    render() {
        return (
            <form id="log-workouts">
                <Row>
                    <Dropdown className="dropdown"
                        value={this.state.workoutType}
                        onChange={this.handleInputChange}
                        name="workoutType"
                        placeholder="Workout"
                    >
                        <Option selected disabled value="" name="Workout Type" />
                        <Option name="For Time" />
                        <Option name="AMRAP" />
                    </Dropdown>
                </Row>
                {this.state.workoutType ? (
                    <div className="log-workouts">
                        <div> Change Date:
                        <DatePicker
                                className="datepicker btn"
                                onChange={this.changeDate}
                            />
                            {moment(this.state.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}

                        </div>
                        <hr></hr>
                        <Row>
                            <Input className="wod-score-input"
                                value={this.state.rounds}
                                onChange={this.handleInputChange}
                                name="rounds"
                                placeholder={this.state.workoutType === "For Time" ? "Rounds: " : "Time"}
                            />
                            {this.state.workoutType === "For Time" ? "Rounds" : "Minutes"}
                        </Row>
                        {this.state.movementArray.length ? (
                            <List>

                                {this.state.movementArray.map(movement => (
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
                                value={this.state.movementName}
                                onChange={this.handleMovementChange}
                                name="movementName"
                                placeholder="Movement"
                            >
                                <Option selected disabled value="" name="Add Movement" />
                                {this.props.movements.map(movement => (
                                    <Option name={movement.name} key={movement._id} />
                                ))}
                            </Dropdown>
                        </Row>
                        {this.state.movementName ? (
                            <Row>
                                <Input className="wod-score-input"
                                    value={this.state.reps}
                                    onChange={this.handleInputChange}
                                    name="reps"
                                    placeholder={this.state.movementType === "cardio" ? "Distance" : "Reps"}
                                />
                                {this.state.movementType === "weight" || this.state.movementType === "to height" ? (
                                    <Input className="wod-score-input"
                                        value={this.state.weight}
                                        onChange={this.handleInputChange}
                                        name="weight"
                                        placeholder={this.state.movementType === "weight" ? "Weight" : "Height"}

                                    />
                                ) : ("")}
                                <Row>
                                    <SaveBtn class="submit-movement"
                                        disabled={!(this.state.movementName && this.state.reps)}
                                        onClick={() => this.addMovement()} />
                                </Row>
                            </Row>


                        ) : ("")}
                        <hr></hr>
                        <WorkoutScore
                            workoutType={this.state.workoutType}
                            seconds = {this.state.seconds}
                            minutes = {this.state.minutes}
                            handleChange = {this.handleInputChange}
                        />
                        <FormBtn
                            className="logscore"
                            disabled={!(this.state.workoutType && this.state.rounds && this.state.movementArray && this.state.minutes)}
                            onClick={()=> {this.props.handleFormSubmit(
                                this.state.date,
                                this.state.workoutType,
                                this.state.rounds,
                                this.state.movementArray,
                                this.state.minutes,
                                this.state.seconds,
                            )
                            this.setState({
                                date: "",
                                workoutType: "",
                                rounds: "",
                                movementName: "",
                                reps: "",
                                weight: "",
                                movementType: "",
                                movementArray: [],
                                repsArray: [],
                                weightsArray: [],
                                minutes: "",
                                seconds: "",
                            })}
                        }
                        >Log Workout</FormBtn>
                    </div>

                ) : ("")}

            </form>
        );
    }
}
export default LogWorkout;

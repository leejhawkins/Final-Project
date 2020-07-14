import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SaveBtn } from "../components/Buttons/SaveBtn"
import { DeleteBtn } from "../components/Buttons/DeleteBtn"
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card"
import { List } from "../components/List";
import { Input, FormBtn, Dropdown, Option } from "../components/Form";
import "./style.css";
import moment, { now } from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { Aggregate, get } from "mongoose";


class User extends Component {
    state = {
        userInfo: {},
        workouts: [],
        movements: [],
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
        date: "",
        age: "",
        image: ""
    };

    componentDidMount() {
        const userName = this.props.match.params.name
        this.getMovements()
        this.loadUser(userName)
    }
    getWOD = (gym, date) => {
        API.getWOD({ createdBy: gym, date: date })
            .then(res => {

                this.setState({
                    wod: res.data
                })
            })
    }
    getMovements = () => {
        API.getMovements()
            .then(res => {
                this.setState({ movements: res.data })
            })
            .catch(err => console.log(err));
    }
    loadUser = userName => {
        API.getUser(userName)
            .then(res => {

                const stats = this.stats(res.data.workouts, res.data.userName)
                console.log(stats);

                this.setState({
                    userInfo: res.data, workouts: res.data.workouts, workoutType: "",
                    dateOfBirth: moment(res.data.dateOfBirth, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY"),
                    age: moment(Date()).diff(res.data.dateOfBirth, 'years', true).toFixed(0),
                    rounds: "",
                    movementName: "",
                    reps: "",
                    movementType: "",
                    weight: "",
                    minutes: "",
                    seconds: "",
                    stats: stats,

                })
                const date = moment().format("YYYY-MM-DD")
                this.setState({ wodDate: date })
                this.getWOD(this.state.userInfo.program, date)
                this.getCrossFitWOD(moment(date,"YYYY-MM-DD").format('YYMMDD'));
            })
            .catch(err => console.log(err));
        }
    getCrossFitWOD = date => {
        API.getCrossFitWOD(date).then(res => {
            console.log(res.data);
            this.setState({ CrossFitWOD: res.data });
        })
        } 
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
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
    handleMovementChange = event => {
        console.log(this.state.movements)
        const { name, value } = event.target;
        let index;
        this.state.movements.forEach((movement, i) => {
            if (movement.name === value) {
                index = i
            }
        })
        const movementType = this.state.movements[index].type
        console.log(index)
        console.log(movementType)
        this.setState({
            [name]: value,
            movementType: movementType
        });
    };

    deleteWorkout = (id, createdBy, scoreId) => {
        console.log(createdBy)
        if (createdBy === this.state.userInfo.userName) {
            API.deleteWorkout(id)
                .then(res => this.loadUser(this.state.userInfo.userName))
                .catch(err => console.log(err));
        } else {
            API.deleteWOD(id, { userName: this.state.userInfo.userName, _id: scoreId })
                .then(res => this.loadUser(this.state.userInfo.userName))
                .catch(err => console.log(err));
        }
    };

    getRoundLength = array => {
        var roundLength = 0;
        for (let i = 0; i < array.length; i++) {
            roundLength += parseInt(array[i].reps)
        }
        return roundLength
    }
    handleFormSubmit = event => {
        event.preventDefault();
        let rawScore;
        if (this.state.workoutType === "For Time") {
            rawScore = parseInt(this.state.minutes) * 60 + parseInt(this.state.seconds);
        } else {
            let roundLength = this.getRoundLength(this.state.movementArray)
            rawScore = parseInt(this.state.minutes) * roundLength + parseInt(this.state.seconds)
        }
        console.log(this.state.userInfo.userName)

        API.saveWorkoutsByUser({
            workoutType: this.state.workoutType,
            rounds: this.state.rounds,
            movements: this.state.movementArray,
            scores: { userName: this.state.userInfo.userName, firstName: this.state.userInfo.firstName, lastName: this.state.userInfo.lastName, score: rawScore },
            date: this.state.date,
            createdBy: this.state.userInfo.userName
        }
        ).then(res => this.loadUser(this.state.userInfo.userName))
            .catch(err => console.log(err));
    }
    changeDate = date => {
        this.setState({ date })
    }
    changeWODDate = date => {
        const newDate = moment(date, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DD")
        this.setState({ wodDate: newDate })
        this.getWOD(this.state.userInfo.program, newDate)
        this.getCrossFitWOD(moment(newDate,"YYYY-MM-DD").format('YYMMDD'));
    }
    submitScore = event => {
        event.preventDefault()
        let rawScore;
        if (this.state.wod.workoutType === "For Time") {
            rawScore = parseInt(this.state.minutes) * 60 + parseInt(this.state.seconds);
        } else {
            let roundLength = this.getRoundLength(this.state.wod.movements)
            rawScore = parseInt(this.state.minutes) * roundLength + parseInt(this.state.seconds)
        }
        API.submitScore({ _id: this.state.wod._id },
            { scores: { userName: this.state.userInfo.userName, firstName: this.state.userInfo.firstName, lastName: this.state.userInfo.lastName, score: rawScore } }
        ).then(res => this.loadUser(this.state.userInfo.userName))
            .catch(err => console.log(err));
    }

    stats = (array, userName) => {
        let countWorkout = array.length;
        var sumMinutes = 0;
        var sumReps = 0;
        var sumWeight = 0;
        let stats = {};
        var roundsArray = array.map(function (rounds) { return (rounds.rounds) })
        var repsArray = array.map(function (reps) { return (reps.reps) })
        var minutesArray = array.map(function (minutes) { return (minutes.minutes) })

        console.log(array);

        for (var i = 0; i < array.length; i++) {
            if (array[i].workoutType === "AMRAP") {
                for (var j = 0; j < array[i].scores.length; j++) {

                    if (array[i].scores[j].userName === userName) {
                        sumMinutes += parseInt(array[i].rounds * 60);
                        sumReps += parseInt(array[i].reps);
                        sumReps += parseInt(array[i].weight);
                        console.log("Total Minutes: " + sumMinutes);
                    }
                }
            }
            else {
                for (var j = 0; j < array[i].scores.length; j++) {

                    console.log("Total Minutes: " + sumMinutes);

                    if (array[i].scores[j].userName === userName) {

                        sumMinutes += parseInt(array[i].scores[j].score);
                        sumReps += parseInt(array[i].reps);
                        sumReps += parseInt(array[i].weight);

                        console.log("Total Minutes: " + sumMinutes);

                    }
                }
            }
        } sumMinutes = Math.round(sumMinutes / 60)

        stats = { countWorkout: countWorkout, sumMinutes: sumMinutes, sumWeight: sumWeight, sumReps: sumReps, rounds: roundsArray, reps: repsArray, mintues: minutesArray }
        console.log(stats)
        return stats;
    }

    render() {
        return (
            <div className="container container-fluid">
                <Container fluid>
                    <Row className="container-fluid">
                        <Col size="md-4" className="container-fluid">
                            <div id="user" className="container-fluid">
                                <h5>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</h5>
                                <hr></hr>
                                <Row>
                                    <Col size="md-5" >
                                        <Card
                                            style={{ margin: "20px" }}
                                            image={this.state.userInfo.image ? this.state.userInfo.image : "https://4.bp.blogspot.com/_CFGTjIBDv4o/Si08hun6XRI/AAAAAAAAAUg/j1ZqSvAmcIU/s280/Pumping+Iron.jpg"}
                                            name={this.state.userInfo.userName}
                                        />
                                    </Col>
                                    <Col size="md-7" style="float:right">
                                        <br></br>
                                        <br></br>
                                        <p>Age: {this.state.age}</p>
                                        <p>Weight: {this.state.userInfo.weight}</p>
                                        <p>Gym: {this.state.userInfo.program}</p>
                                        {this.state.stats ? (
                                            <p>Workouts: {this.state.stats.countWorkout}</p>
                                        ) : ("")
                                        }
                                    </Col>
                                </Row>

                                <hr></hr>

                                <Row>
                                    {this.state.stats ? (

                                        <Col size="md-8">
                                            <p>Total Minutes: {this.state.stats.sumMinutes}  Rounds:</p>
                                        </Col>
                                    ) : ("")
                                    }
                                    {this.state.stats ? (
                                        <Col size="md-4" style="float:right">
                                            <Sparklines data={this.state.stats.rounds} limit={10} height={40}>
                                                <SparklinesLine color="blue" fill="white" />
                                                <SparklinesSpots />
                                            </Sparklines>
                                        </Col>
                                    ) : ("")
                                    }
                                </Row>
                                <br></br>
                                <Row>
                                    {this.state.stats ? (
                                        <Col size="md-8">
                                            <p>Total Reps: {this.state.stats.sumReps}  Reps:</p>
                                        </Col>
                                    ) : ("")
                                    }
                                    {this.state.stats ? (
                                        <Col size="md-4" style="float:right">
                                            <Sparklines data={this.state.stats.reps} limit={10} height={40}>
                                                <SparklinesLine color="blue" fill="white" />
                                                <SparklinesSpots />
                                            </Sparklines>
                                        </Col>
                                    ) : ("")
                                    }
                                </Row>
                                <br></br>
                                <Row>
                                    {this.state.stats ? (
                                        <Col size="md-8">
                                            <p>Total Weight: {this.state.stats.sumWeight}  Weight:</p>
                                        </Col>
                                    ) : ("")
                                    }
                                    {this.state.stats ? (
                                        <Col size="md-4" style="float:right">
                                            <Sparklines data={this.state.stats.weight} limit={10} height={40}>
                                                <SparklinesLine color="blue" fill="white" />
                                                <SparklinesSpots />
                                            </Sparklines>
                                        </Col>
                                    ) : ("")
                                    }
                                </Row>

                            </div>

                        </Col>


                        <Col size="md-4">
                            <div id="wod" >
                                <h5>{this.state.userInfo.program}'s Workout of the Day</h5>
                                <hr></hr>
                                <div>
                                    <div>Date:
                                        <DatePicker
                                            className="datepicker"
                                            onChange={this.changeWODDate}
                                            name="select date"
                                        />
                                    </div>
                                </div>
                                <hr></hr>

                                {this.state.wod ? (
                                    <div className="div-wod-score">

                                        <p>{moment(this.state.wod.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</p>

                                        <br></br>

                                        {this.state.wod.workoutType === "For Time"

                                            ? <p>{this.state.wod.workoutType} {this.state.wod.rounds} Rounds</p>

                                            : <p>{this.state.wod.workoutType} for {this.state.wod.rounds} minutes</p>}

                                        {this.state.wod.movements.map(movement => (
                                            <p>
                                                {movement.reps} {movement.movementType === "cardio" ? "m" : "x"} {movement.name}  {movement.movementType === "weight" ? `at ${movement.weight} lbs` : ""}{movement.movementType === "to height" ? `at ${movement.weight} inches` : ""}
                                            </p>
                                        ))}

                                        <div>

                                            <hr></hr>

                                            <div className="div-wod-score">

                                                <Row key={this.state.wod._id}>

                                                    <p className="div-wod-title">{this.state.wod.workoutType === "For Time" ? "Time: " : "Score: "}</p>

                                                    <Input
                                                        className="wod-score-input"
                                                        value={this.state.minutes}
                                                        onChange={this.handleInputChange}
                                                        name="minutes"
                                                        placeholder={this.state.wod.workoutType === "For Time" ? "Minutes" : "Rounds"}
                                                    />

                                                    <h5>{this.state.wod.workoutType === "For Time" ? " : " : " + "}</h5>
                                                    <Input
                                                        className="wod-score-input"
                                                        value={this.state.seconds}
                                                        onChange={this.handleInputChange}
                                                        name="seconds"
                                                        placeholder={this.state.wod.workoutType === "For Time" ? "Seconds" : "Reps"}
                                                    />
                                                    <div>
                                                        <FormBtn
                                                            className="submit"
                                                            disabled={!(this.state.seconds && this.state.minutes)}
                                                            onClick={this.submitScore}
                                                        >Submit Score
                                                        </FormBtn>
                                                    </div>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>

                                ) : ("")}
                                {this.state.CrossFitWOD ? (<h6>{this.state.CrossFitWOD.map(item => (

                                    <p>{item}</p>
                                ))} </h6>):("")}

                            </div>
                        </Col>

                        <Col size="md-4">
                            <div id="logworkout" className="fluid">
                                <h5>Log a Workout </h5>
                                <hr></hr>
                                <div>Date:
                                                <DatePicker
                                        className="datepicker"
                                        selected={this.state.date}
                                        onChange={this.changeDate}
                                    />
                                </div>
                                <hr></hr>

                                <form id="log-workouts" className="fluid">
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
                                                    {this.state.movements.map(movement => (
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
                                                        <SaveBtn className="submit-movement"
                                                            disabled={!(this.state.movementName && this.state.reps)}
                                                            onClick={() => this.addMovement()} />
                                                    </Row>

                                                </Row>


                                            ) : ("")}
                                            <hr></hr>

                                            <Row className="div-wod-score">
                                                <div className="div-wod-title">{this.state.workoutType === "For Time" ? "Time: " : "Score: "}</div>
                                                <Input className="wod-score-input"
                                                    value={this.state.minutes}
                                                    onChange={this.handleInputChange}
                                                    name="minutes"
                                                    placeholder={this.state.workoutType === "For Time" ? "Minutes" : "Rounds"}
                                                />
                                                <h6>{this.state.workout === "For Time" ? " : " : " + "}</h6>

                                                <Input className="wod-score-input"
                                                    value={this.state.seconds}
                                                    onChange={this.handleInputChange}
                                                    name="seconds"
                                                    placeholder={this.state.workoutType === "For Time" ? "Seconds" : "Reps"}
                                                />
                                            </Row>

                                            <FormBtn
                                                className="logscore"
                                                disabled={!(this.state.workoutType && this.state.rounds && this.state.movementArray && this.state.minutes)}
                                                onClick={this.handleFormSubmit}
                                            >
                                                Log Workout
                                         </FormBtn>
                                        </div>

                                    ) : ("")}

                                </form>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="md-12">
                            <div id="workouts">
                                <h5>Recent Workouts</h5>
                                <hr></hr>
                                <Row>
                                    {this.state.workouts.length ? (
                                        <div className="table-responsive" >
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Type</th>
                                                        <th>Duration</th>
                                                        <th>Movements</th>
                                                        <th>Score/Time</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>

                                                {this.state.workouts.map(workout => (
                                                <tbody>

                                                        <tr key={workout._id} >
                                                            <td style={{ textAlign: "center" }}><span className="table-labels">{moment(workout.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</span></td>
                                                            <td style={{ textAlign: "center" }}> {workout.workoutType}</td>
                                                            <td style={{ textAlign: "center" }}>{workout.workoutType === "AMRAP" ? <p> for {workout.rounds} minutes of: </p> : <p>{workout.rounds} rounds of: </p>}
                                                            </td>
                                                            <td >
                                                                {workout.movements.map((movement, i) => (
                                                                    <span> {movement.reps} {movement.movementType === "cardio" ? " m " : " x "}
                                                                        {movement.name}
                                                                        {movement.movementType === "weight" ? ` at ${movement.weight} lbs` : ""}
                                                                        {movement.movementType === "to height" ? ` at ${movement.weight} inches` : ""}
                                                                        {(workout.movements.length - 1) === i ? "" : ","}
                                                                    </span>
                                                                ))}
                                                            </td>
                                                            {workout.scores.map(score =>
                                                                <td style={{ textAlign: "center" }}>
                                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "For Time" ? (
                                                                        <p><span className="table-labels">Time:</span><br></br>{Math.floor(score.score / 60)}:{score.score % 60}</p>) : ("")}
                                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "AMRAP" ? (
                                                                        <p><span className="table-labels">Score:</span><br></br> {Math.floor(score.score / this.getRoundLength(workout.movements))} Rounds + {score.score % this.getRoundLength(workout.movements)} Reps</p>) : ("")}
                                                                </td>
                                                            )}
                                                            {workout.scores.map(score =>
                                                                <td style={{ textAlign: "center" }}>
                                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "For Time" ?

                                                                        (<DeleteBtn className="btn btn-submit" onClick={() => this.deleteWorkout(workout._id, workout.createdBy, score._id)}>Delete</DeleteBtn>
                                                                            // <UpdateBtn className="btn btn-submit"></UpdateBtn>
                                                                        ) : ("")}

                                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "AMRAP" ?
                                                                        (
                                                                            <DeleteBtn className="btn btn-submit" onClick={() => this.deleteWorkout(workout._id, workout.createdBy, score._id)}>Delete</DeleteBtn>
                                                                            // <UpdateBtn className="btn btn-submit">Update</UpdateBtn>
                                                                        ) : ("")}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                ))}

                                            </table>
                                        </div>
                                    ) : ("")}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container >
            </div >
        )
    }
};

export default User

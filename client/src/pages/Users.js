import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SaveBtn } from "../components/Buttons/SaveBtn"
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import { Input, FormBtn, Dropdown, Option } from "../components/Form";
import "./style.css";


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
        seconds: ""
    };

    componentDidMount() {
        const userName = this.props.match.params.name
        this.getMovements()
        this.loadUser(userName)

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
                console.log(res.data.workouts)
                this.setState({
                    userInfo: res.data, workouts: res.data.workouts, workoutType: "",
                    rounds: "",
                    movementName: "",
                    reps: "",
                    movementType: "",
                    weight: "",
                    minutes: "",
                    seconds: ""
                })

            })
            .catch(err => console.log(err));
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    addMovement = () => {
        if (this.state.movementName && this.state.reps) {
            const movement = { name: this.state.movementName, reps: this.state.reps, weight: this.state.weight,movementType:this.state.movementType }
            const movementArray = this.state.movementArray
            movementArray.push(movement)
            console.log(movementArray)
            this.setState({ movementArray: movementArray, movementName: "", reps: "", weight: "",movementType:"" })
        }

    }
    handleMovementChange = event => {
        console.log(this.state.movements)
        const { name, value } = event.target;
        let index;
        this.state.movements.forEach(movement => {
            for (let i = 0; i < this.state.movements.length; i++) {
                if (this.state.movements[i].name === value) {
                    index = i
                }
            }
        })
        const  movementType= this.state.movements[index].type
        console.log(index)
        console.log(movementType)
        this.setState({
                [name]: value,
                movementType: movementType
            });
        
       
    };
    getRoundLength = array => {
        var roundLength = 0;
        for (let i = 0; i < array.length; i++) {
            roundLength += parseInt(array[i].reps)
        }
        console.log(roundLength)
        return roundLength

    }
    handleFormSubmit = event => {
        event.preventDefault();
        let rawScore;  
        if (this.state.workoutType==="For Time") {
            rawScore = parseInt(this.state.minutes) * 60 + parseInt(this.state.seconds);
        } else {
            let roundLength = this.getRoundLength(this.state.movementArray)
            rawScore = parseInt(this.state.minutes)*roundLength + parseInt(this.state.seconds)
        }
        console.log(this.state.userInfo.userName)
       
        API.saveWorkouts({
            workoutType: this.state.workoutType,
            rounds: this.state.rounds,
            movements: this.state.movementArray,
            scores: { userName: this.state.userInfo.userName, score: rawScore }
        }
        ).then(res => this.loadUser(this.state.userInfo.userName))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <Container fluid>
                    <Row>
                        <Col size="md-4">
                            <Jumbotron>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</Jumbotron>
                            <h3>Log a Workout </h3>
                            <form>
                                <Row>
                                    <label htmlFor="workout">Workout </label>
                                    <Dropdown
                                        value={this.state.workoutType}
                                        onChange={this.handleInputChange}
                                        name="workoutType"
                                        placeholder="Workout"
                                    >
                                        <Option selected disabled value="" name="Workout" />
                                        <Option name="For Time" />
                                        <Option name="AMRAP" />
                                    </Dropdown>
                                </Row>
                                {this.state.workoutType ? (
                                    <Container>
                                        <Row>
                                            <Input
                                                value={this.state.rounds}
                                                onChange={this.handleInputChange}
                                                name="rounds"
                                                placeholder={this.state.workoutType === "For Time" ? "Rounds" : "Time"}
                                            />
                                            <h5>{this.state.workoutType=="For Time" ? "Rounds" : "Minutes"} </h5>
                                        </Row>
                                        <Row>
                                            <label htmlFor="movementName">Movement:</label>
                                            <Dropdown
                                                value={this.state.movementName}
                                                onChange={this.handleMovementChange}
                                                name="movementName"
                                                placeholder="Movement"
                                            >
                                                <Option selected disabled value="" name="Choose Movement" />
                                                {this.state.movements.map(movement => (
                                                    <Option name={movement.name} key={movement._id} />
                                                ))}
                                            </Dropdown>
                                            {this.state.movementName ? (
                                                <div>
                                                    <Input
                                                        value={this.state.reps}
                                                        onChange={this.handleInputChange}
                                                        name="reps"
                                                        placeholder={this.state.movementType === "cardio" ? "Distance" : "Reps"}
                                                    />
                                                    {this.state. movementType=== "weight" || this.state. movementType=== "to height" ? (
                                                        <Input
                                                            value={this.state.weight}
                                                            onChange={this.handleInputChange}
                                                            name="weight"
                                                            placeholder={this.state.movementType === "weight" ? "Weight" : "Height"}

                                                        />
                                                    ):("")}
                                                    
                                                    <SaveBtn
                                                        disabled={!(this.state.movementName && this.state.reps)}
                                                        onClick={() => this.addMovement()} />
                                                </div>
                                            ) : ("")}


                                        </Row>
                                        {this.state.movementArray.length ? (
                                            <List>

                                                {this.state.movementArray.map(movement => (
                                                    <Row>
                                                        <Col size="md-4">
                                                            <p>{movement.reps} {movement.movementType==="cardio" ? "m":"x"} </p>
                                                        </Col>
                                                        <Col size="md-4">
                                                            <p>{movement.name}</p>
                                                        </Col>
                                                        {movement.movementType==="weight" || movement.movementType==="to height" ? (
                                                        <Col size="md-4">
                                                            {movement.movementType==="weight" ? <p>at {movement.weight} lbs</p> : <p>to {movement.weight} inches</p>}
                                                        </Col>
                                                        ):("")}
                                                    </Row>
                                                ))}
                                            </List>
                                        ) : ("")}

                                        <Row>
                                            <h5>{this.state.workoutType === "For Time" ? "Time: " : "Score: "}</h5>
                                            <Input
                                                value={this.state.minutes}
                                                onChange={this.handleInputChange}
                                                name="minutes"
                                                placeholder={this.state.workout === "For Time" ? "Minutes" : "Rounds"}
                                            />
                                            <h3>{this.state.workout === "For Time" ? " : " : " + "}</h3>
                                            <Input
                                                value={this.state.seconds}
                                                onChange={this.handleInputChange}
                                                name="seconds"
                                                placeholder={this.state.workout === "For Time" ? "Seconds" : "Reps"}
                                            />
                                        </Row>

                                        <FormBtn
                                            disabled={!(this.state.workoutType && this.state.rounds && this.state.movementArray && this.state.minutes)}
                                            onClick={this.handleFormSubmit}
                                        >
                                            Log Workout
                            </FormBtn>
                                    </Container>

                                ) : ("")}

                            </form>

                        </Col>
                        <Col size="md-4">
                            <Jumbotron>Workouts</Jumbotron>

                            <h3>Recent Workouts</h3>

                            {this.state.workouts.length ? (
                                <List>
                                    {this.state.workouts.map(workout => (
                                        <Row key={workout._id}>
                                            <Col size="md-2">
                                                {workout.workoutType}
                                                {workout.workoutType === "AMRAP" ? <p>For {workout.rounds} minutes</p>:""}
                                            </Col>
                                            <Col size="md-5">
                                                {workout.workoutType === "For Time" ? <p>Rounds: {workout.rounds}</p> : ""}
                                                {workout.movements.map(movement => (
                                                    <p>
                                                        {movement.reps} {movement.movementType === "cardio" ? "m" : "x"} {movement.name}  {movement.movementType === "weight" ? `at ${movement.weight} lbs` : ""}{movement.movementType === "to height" ? `at ${movement.weight} inches` : ""}
                                                    </p>
                                                ))}


                                            </Col>

                                            {workout.scores.map(score => (
                                                <Col size="md-5">
                                                    {score.userName === this.state.userInfo.userName && workout.workoutType ==="For Time" ? (
                                                    <p>Time: {Math.floor(score.score / 60)}:{score.score % 60}</p>):("")}
                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "AMRAP" ? (
                                                        <p>Score: {Math.floor(score.score / this.getRoundLength(workout.movements))} Rounds + {score.score % this.getRoundLength(workout.movements)} Reps</p>
                                                     ) : ("")}


                                                </Col>
                                            ))}
                                           
                                        </Row>
                                    ))}
                                </List>
                            ) : (<h3>Future Workouts Go Here </h3>)}


                        </Col>
                        <Col size="md-4">
                            <Jumbotron>Stats</Jumbotron>

                            <h3>See Workout Stats</h3>

                            {this.state.workouts.length ? (
                                <List>
                                    {this.state.workouts.map(workout => (
                                        <Row key={workout._id}>
                                            <Col size="md-3">
                                                {workout.workout}
                                            </Col>
                                            <Col size="md-3">
                                                Time: {Math.floor(workout.time / 60)}:{workout.time % 60}
                                            </Col>
                                            <Col size="md-3">
                                                Rounds: {workout.rounds}
                                            </Col>
                                            <Col size="md-3">
                                                {workout.movementReps}  {workout.movementName} at {workout.movementWeight} lbs
                                        </Col>

                                        </Row>
                                    ))}
                                </List>
                            ) : (<h3></h3>)}

                        </Col>
                    </Row>

                </Container>

            </div>
        );
    }
}

export default User

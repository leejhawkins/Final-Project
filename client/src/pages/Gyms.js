import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SaveBtn } from "../components/Buttons/SaveBtn"
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn, Dropdown, Option } from "../components/Form";
import "./style.css";
import moment from 'moment';
import Calendar from 'react-calendar';


class Gym extends Component {
    state = {
        gym: "",
        userInfo: [],
        workouts: []
    }

    componentDidMount() {
        const gym = this.props.match.params.name
        const date = moment().format("YYYY-MM-DD")
        console.log(date)


        this.setState({ gym: gym, date: date })
        this.loadUsers(gym)
        this.getWOD(gym, date)

    }

    loadUsers = gym => {
        API.getGymUsers(gym)
            .then(res => {
                this.setState({
                    userInfo: res.data.users
                })

            })
            .catch(err => console.log(err));
    }
    getWOD = (gym, date) => {
        console.log(date)
        API.getWOD({ createdBy: gym, date: date })
           
            .then(res => {
                if (!(res.data===null)) {
                    if (res.data.workoutType==="For Time") {
                        const scores = res.data.scores.sort((a, b) => a.score - b.score)
                    } else {
                        const scores = res.data.scores.sort((a, b) => b.score - a.score)
                    }
                   
                }
                this.setState({
                    wod: res.data
                })
            })
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    getRoundLength = array => {
        var roundLength = 0;
        for (let i = 0; i < array.length; i++) {
            roundLength += parseInt(array[i].reps)
        }
        return roundLength

    }
    changeWODDate = date => {
       
        const newDate = moment(date, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DD")
        this.setState({ date: newDate })
        this.getWOD(this.state.gym,newDate)
    }
    render() {
        return (
            <div className="container">
                <Container fluid>
                    <Row>

                        <Col size="md-4">
                            <div id="wod">
                                <h5>{this.state.gym}'s Workout of the Day {this.state.date}</h5>
                                <hr></hr>
                                {this.state.wod ? (
                                    <div>
                                        {this.state.wod.workoutType} {this.state.wod.rounds} Rounds
                                        {this.state.wod.movements.map(movement => (
                                            <p>
                                                {movement.reps} {movement.movementType === "cardio" ? "m" : "x"} {movement.name}  {movement.movementType === "weight" ? `at ${movement.weight} lbs` : ""}{movement.movementType === "to height" ? `at ${movement.weight} inches` : ""}
                                            </p>
                                        ))}
                                    </div>
                                ) : (<h5>There is no workout for {this.state.date}</h5>)}
                                <div>
                                    <Calendar
                                        onChange={this.changeWODDate}
                                    />
                                </div>

                            </div>

                            {this.state.workouts.length ? (
                                <List>
                                    {this.state.workouts.map(workout => (
                                        <Row key={workout._id}>
                                            <Col size="md-2">
                                                {workout.workoutType}
                                                {workout.workoutType === "AMRAP" ? <p>For {workout.rounds} minutes</p> : ""}
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
                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "For Time" ? (
                                                        <p>Time: {Math.floor(score.score / 60)}:{score.score % 60}</p>) : ("")}
                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "AMRAP" ? (
                                                        <p>Score: {Math.floor(score.score / this.getRoundLength(workout.movements))} Rounds + {score.score % this.getRoundLength(workout.movements)} Reps</p>
                                                    ) : ("")}


                                                </Col>
                                            ))}

                                        </Row>
                                    ))}
                                </List>
                            ) : (<h3></h3>)}


                        </Col>
                        <Col size="md-4">
                            <div id="scores">
                                <h2>WOD Scores:</h2>
                                <hr></hr>
                                {this.state.wod ? (<div>
                                    {
                                        this.state.wod.scores.map(score => (
                                            <Row>
                                                <Col size="md-6">
                                                    {score.userName}
                                                </Col>
                                                <Col size="md-6">
                                                    {this.state.wod.workoutType === "For Time" ? (
                                                        <p>Time: {Math.floor(score.score / 60)}:{score.score % 60}</p>) : ("")}
                                                    {this.state.wod.workoutType === "AMRAP" ? (
                                                        <p>Score: {Math.floor(score.score / this.getRoundLength(this.state.wod.movements))} Rounds + {score.score % this.getRoundLength(this.state.wod.movements)} Reps</p>
                                                    ) : ("")}


                                                </Col>
                                            </Row>
                                        ))
                                    } </div>
                                ):("")}
                               
                            </div>
                        </Col>
                        <Col size="md-4">
                            <div id="members">
                                <h2>Members:</h2>
                                <hr></hr>
                                {this.state.userInfo.map(member => (
                                    <p>{member.firstName}  {member.lastName}</p>
                                ))}
                            </div>
                        </Col>

                    </Row>

                </Container>

            </div>
        );
    }
}

export default Gym

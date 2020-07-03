import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SaveBtn } from "../components/Buttons/SaveBtn"
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn, Dropdown, Option } from "../components/Form";
import "./style.css";


class Gym extends Component {
    state = {
        userInfo: {},
        workouts: [],
    }

    componentDidMount() {
        const gym = this.props.match.params.name
        this.loadUsers(gym)

    }
    loadUser = gym => {
        API.getGymUsers(gym)
            .then(res => {
                console.log(res.data.workouts)
                this.setState({
                    userInfo: res.data, workouts: res.data.workouts
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
    render() {
        return (
            <div className="container">
                <Container fluid>
                    <Row>
                        
                        <Col size="md-6">
                            <Jumbotron>Workouts</Jumbotron>

                            <h3>Recent Workouts</h3>

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
                            ) : (<h3>Future Workouts Go Here </h3>)}


                        </Col>
                       
                    </Row>

                </Container>

            </div>
        );
    }
}

export default Gym

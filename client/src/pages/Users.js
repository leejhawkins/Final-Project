import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class User extends Component {
    state = {
        userInfo: {},
        type: "",
        rounds:"",
        movementName: "",
        reps: "",
        weight: "",
        time: ""
      

    }
    componentDidMount() {
        const userName = this.props.match.params.name
        console.log(userName)
        API.getUser(userName)
            .then(res => this.setState({ userInfo: res.data }))
            .catch(err => console.log(err));
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        API.saveWorkouts({
            type: this.state.type,
            rounds: this.state.rounds,
            movements: {
                name: this.state.movementName,
                reps: this.state.reps,
                weight: this.state.weight
            },
            time: this.state.time,
            createdBy: this.state.userInfo.userName
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>User Info Area</h1>
                        </Jumbotron>
                        <h3>Future Workouts Go Here </h3>
                    </Col>
                    <Col size="md-6">

                        <Jumbotron>
                            <h1>Stats Go here</h1>
                        </Jumbotron>


                        <h3>Log a Workout </h3>
                        <form>
                            <Input
                                value={this.state.type}
                                onChange={this.handleInputChange}
                                name="type"
                                placeholder="Workout Type"
                            />
                            <Input
                                value={this.state.rounds}
                                onChange={this.handleInputChange}
                                name="rounds"
                                placeholder="Rounds"
                            />
                            <Input
                                value={this.state.movementName}
                                onChange={this.handleInputChange}
                                name="movementName"
                                placeholder="Movement"
                            />
                            <Input
                                value={this.state.reps}
                                onChange={this.handleInputChange}
                                name="reps"
                                placeholder="Reps"
                            />
                            <Input
                                value={this.state.weight}
                                onChange={this.handleInputChange}
                                name="weight"
                                placeholder="weight"
                            />
                            <Input
                                value={this.state.time}
                                onChange={this.handleInputChange}
                                name="time"
                                placeholder="Time"
                            />
                            <FormBtn
                                disabled={!(this.state.type && this.state.rounds)}
                                onClick={this.handleFormSubmit}
                            >
                                Log Workout
                            </FormBtn>
                        </form>





                    </Col>
                </Row>
            </Container>
        );
    }
}

export default User
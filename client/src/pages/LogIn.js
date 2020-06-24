import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class LogIn extends Component {
    state = {
        userName: "",
        password: ""
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.userName)

        API.getUser(this.state.userName)
            .then(res => window.location.assign("/users/"+res.data.userName))
            .catch(err => console.log(err));

    };
    

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                Fitness App
                        </h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        <form>
                            <Input
                                value={this.state.userName}
                                onChange={this.handleInputChange}
                                name="userName"
                                placeholder="User Name"
                            />
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder="Password"
                            />
                            <FormBtn
                                disabled={!(this.state.userName && this.state.password)}
                                onClick={this.handleFormSubmit}
                            >
                            Log In
                            </FormBtn>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-2">
                        <Link to="/new-user">← New User Sign Up</Link>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default LogIn;

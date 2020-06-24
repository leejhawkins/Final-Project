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
        userName: "",
        password: "",
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
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Stats Go here</h1>
                        </Jumbotron>
                       <h3>Past Workouts Go Here </h3>
                    
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default User
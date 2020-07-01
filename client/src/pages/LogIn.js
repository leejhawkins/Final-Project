import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import {useAuth} from "../context/auth"
import DeleteBtn from "../components/Buttons/DeleteBtn";


class LogIn extends Component {
    state = {
        userName: "",
        password: "",
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        let userData={
            userName:this.state.userName,
            password:this.state.password
        }
        API.checkPassword(userData)
            .then(res => {
                if (res.status===200){
                    localStorage.setItem("tokens", JSON.stringify(
                        {
                            userName:res.data.userName,
                            gym:res.data.program,
                            dateOfBirth:res.data.dateOfBirth
                        }
                    ));
                    window.location.assign("/users/"+res.data.userName)
                } else {
                    alert("Incorrect user name or password")
                    this.setState(
                        {userName: "",
                        password: ""})
                }
            })
            .catch(err => {
                alert("Incorrect user name or password")
                this.setState(
                 {
                     userName: "",
                     password: ""
                 })
            })

    };
    

    render() {
        return (
            <div className= "container">
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
                                type="password"
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
                    <Col size="md-3">
                        <Link to="/new-user">← New User Sign Up</Link>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }

}

export default LogIn;

import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn, Dropdown, Option } from "../components/Form";
import "./style.css";


class LogIn extends Component {
    state = {
        users: [],
        programs: [],
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        dateOfBirth: "",
        weight: "",
        program: ""
    };
    componentDidMount() {
        API.getUsers().then(res => {
            console.log(res.data)
            this.setState({ users: res.data })
            API.getPrograms().then(res => {
                console.log(res.data)
                this.setState({ programs: res.data })
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
    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.users)
        if (this.state.users.findIndex(element => element.userName === this.state.userName) === -1) {
            API.createUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                password: this.state.password,
                dateOfBirth: this.state.dateOfBirth,
                weight: this.state.weight,
                program: this.state.program
            })
                .then(res => window.location.assign("/"))
                .catch(err => console.log(err));
        } else {
            alert("that user name is already taken")
        }
    };

    render() {
        return (
           <div className="container">
                <Container fluid>
                    <Row>
                        <Col size="md-12">
                            <Jumbotron>
                                <h1>
                                    New User Setup
                        </h1>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="md-10 md-offset-1">
                            <form>
                                <Input
                                    className="user-input"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                    name="firstName"
                                    placeholder="First Name"
                                />
                                <Input
                                    className="user-input"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                    name="lastName"
                                    placeholder="Last Name"
                                />
                                <Input
                                    className="user-input"
                                    value={this.state.userName}
                                    onChange={this.handleInputChange}
                                    name="userName"
                                    placeholder="User Name"
                                />
                                <Input
                                    className="user-input"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    name="password"
                                    placeholder="Password"
                                />
                                <Input
                                    className="user-input"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleInputChange}
                                    name="dateOfBirth"
                                    placeholder="Date of Birth"
                                />
                                <Input
                                    className="user-input"
                                    value={this.state.weight}
                                    onChange={this.handleInputChange}
                                    name="weight"
                                    placeholder="weight"
                                />
                                <Dropdown
                                    className="user-input"
                                    value={this.state.program}
                                    onChange={this.handleInputChange}
                                    name="program"
                                    placeholder="Program"
                                >
                                    <Option selected disabled value="" name="Program" />
                                    {this.state.programs.map(program => (
                                        <Option name={program.name} key={program._id} />
                                    ))}
                                </Dropdown>

                                <FormBtn
                                    className="login"
                                    disabled={!(this.state.userName && this.state.password && this.state.dateOfBirth && this.state.weight)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Create New User
                            </FormBtn>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default LogIn;

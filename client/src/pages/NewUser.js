import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom"; 
import { Col, Row } from "../components/Grid";
import { Input, FormBtn, Dropdown, Option } from "../components/Form";
import "./style.css";


class NewUser extends Component {
    state = {
        users: [],
        programs: [],
        firstName: "", 
        lastName: "",
        userName: "",
        password: "",
        dateOfBirth: "",
        weight: "",
        program: "",
        registrationType: "User"
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
        if (this.state.users.findIndex(element => element.userName === this.state.userName) === -1  && this.state.registrationType==="User") {
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
        } else if (this.state.programs.findIndex(element => element.name === this.state.userName) === -1 && this.state.registrationType === "Gym") {
            API.createProgram({
                name: this.state.userName,
                password: this.state.password
            })
                .then(res => window.location.assign("/"))
                .catch(err => console.log(err));
        } else {
            alert(`that ${this.state.registrationType ==="user" ? "user name": "gym name"} is already taken`)
        }
    };

    render() {
        return (
            <div className="card">
                <div className="textintro">
                    <h1>Register   {this.state.registrationType} </h1>
                </div>
                            <form>
                                {this.state.registrationType === "User" ? 
                                    (<>
                                    <Input
                                        className="user-input"
                                        value={this.state.firstName}
                                        onChange={this.handleInputChange}
                                        name="firstName"
                                        placeholder="First Name"
                                    /><Input
                                        className="user-input"
                                        value={this.state.lastName}
                                        onChange={this.handleInputChange}
                                        name="lastName"
                                        placeholder="Last Name"
                                    />
                                    </>):""}
                                
                                <Input
                                    className="user-input"
                                    value={this.state.userName}
                                    onChange={this.handleInputChange}
                                    name="userName"
                                    placeholder={this.state.registrationType==="User" ? "User Name": "Gym Name"}
                                />
                                <Input
                                    className="user-input"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    name="password"
                                    placeholder="Password"
                                />
                                {this.state.registrationType==="User" ? (
                                    <>
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
                                </>
                                ):""}
                                
                               

                                <FormBtn
                                    className="login"
                                    disabled={!(this.state.userName && this.state.password)}
                                    onClick={this.handleFormSubmit}
                                >
                                   {this.state.registrationType==="User" ? "Create New User" : "Register Gym"}
                            </FormBtn>
                            </form>
                <Row>
                    <Col size="md-3">
                        <Link to="/">← Log In</Link>
                    </Col>
                    <Col size="md-9">
                        <div className="btn-group float-right">
                            <button
                                className={this.state.registrationType === 'User' ? "btn btn-primary" : "btn btn-secondary"}
                                type="button"
                                value="User"
                                onClick={e => this.setState({ registrationType: e.target.value })}
                            >User</button>
                            <button
                                className={this.state.registrationType === 'Gym' ? "btn btn-primary" : "btn btn-secondary"}
                                type="button"
                                value="Gym"
                                onClick={e => this.setState({registrationType:e.target.value})}
                            >Gym</button>
                        </div>

                    </Col>
                </Row>
            
            </div>
        )
    }

}

export default NewUser;

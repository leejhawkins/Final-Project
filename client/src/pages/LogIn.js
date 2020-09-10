import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import "./style.css";

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
            <div className= "card">
                <div class="textintro">
                    <h1>Log In</h1>
                </div>
                
                
                    
                        <form>
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
                            <FormBtn
                                className="login"
                                disabled={!(this.state.userName && this.state.password)}
                                onClick={this.handleFormSubmit}
                            >
                            Log In
                            </FormBtn>
                        </form>
                   
                <Row>
                    <Col size="md-3">
                        <Link to="/new-user">← New User Sign Up</Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default LogIn;

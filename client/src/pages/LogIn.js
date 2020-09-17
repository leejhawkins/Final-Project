import React, { useState } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import "./style.css";

const LogIn = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [logInType, setType] = useState('user')
    const handleFormSubmit = (e, userName, password, logInType) => {
        e.preventDefault()
        let userData = {
            userName: userName,
            password: password
        }
        if (logInType === "user") {
            API.checkPassword(userData)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem("tokens", JSON.stringify(
                            {
                                userName: res.data.userName,
                                gym: res.data.program,
                            }
                        ));
                        window.location.assign("/users/" + res.data.userName)
                    } else {
                        alert("Incorrect user name or password")
                        setUserName('')
                        setPassword('')
                    }
                })
                .catch(err => {
                    alert("Incorrect user name or password")
                    setUserName('')
                    setPassword('')
                })

        } else {
            API.checkGymPassword(userData)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem("tokens", JSON.stringify(
                            {
                                name: res.data.name,
                                admin: true
                            }
                        ));
                        window.location.assign("/gyms/" + res.data.name)
                    } else {
                        alert("Incorrect user name or password")
                        setUserName('')
                        setPassword('')
                    }
                })
                .catch(err => {
                    alert("Incorrect user name or password")
                    setUserName('')
                    setPassword('')
                })


        }
    }

    return (
        <div className="card">
            <div className="textintro">
                <h1>{logInType === "user" ? "User " : "Gym Administrator "}Log In</h1>
            </div>
            <form>
                <Input
                    className="user-input"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}

                    placeholder={logInType === "user" ? "User Name " : "Gym "}
                />
                <Input
                    className="user-input"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    placeholder="Password"
                />
                <FormBtn
                    className="login"
                    disabled={!(userName && password)}
                    onClick={e => handleFormSubmit(e, userName, password,logInType)}
                >
                    Log In
                            </FormBtn>
            </form>

            <Row>
                <Col size="md-3">
                    <Link to="/new-user">← New User Sign Up</Link>
                </Col>
                <Col size="md-9">
                    <div className="btn-group float-right">
                        <button
                            className={logInType === 'user' ? "btn btn-primary" : "btn btn-secondary"}
                            type="button"
                            value="user"
                            onClick={e => setType(e.target.value)}
                        >User</button>
                        <button
                            className={logInType === 'admin' ? "btn btn-primary" : "btn btn-secondary"}
                            type="button"
                            value="admin"
                            onClick={e => setType(e.target.value)}
                        >Admin</button>
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default LogIn

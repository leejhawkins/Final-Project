import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SaveBtn } from "../components/Buttons/SaveBtn"
import { DeleteBtn } from "../components/Buttons/DeleteBtn"
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import { Input, FormBtn, Dropdown, Option } from "../components/Form";
import "./style.css";
import moment, { now } from 'moment'
import Calendar from 'react-calendar';


class User extends Component {
    state = {
        userInfo: {},
        workouts: [],
        movements: [],
        workoutType: "",
        rounds: "",
        movementName: "",
        reps: "",
        weight: "",
        movementType: "",
        movementArray: [],
        repsArray: [],
        weightsArray: [],
        minutes: "",
        seconds: "",
        date: "",
        age:"",
        image:""
    };

    componentDidMount() {
        const userName = this.props.match.params.name      
        this.getMovements()
        this.loadUser(userName)
    }
    getWOD = (gym, date) => {
        API.getWOD({ createdBy: gym, date: date })
            .then(res => {
                console.log(res.data)
                this.setState({
                    wod: res.data
                })
            })
    }
    getMovements = () => {
        API.getMovements()
            .then(res => {
                this.setState({ movements: res.data })
            })
            .catch(err => console.log(err));
    }
    loadUser = userName => {
        API.getUser(userName)
            .then(res => {
                this.setState({
                    userInfo: res.data, workouts: res.data.workouts, workoutType: "",
                    dateOfBirth: moment(res.data.dateOfBirth, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY"),
                    age: moment(Date()).diff(res.data.dateOfBirth, 'years', true).toFixed(0),
                    rounds: "",
                    movementName: "",
                    reps: "",
                    movementType: "",
                    weight: "",
                    minutes: "",
                    seconds: ""
                })
                const date = moment().format("YYYY-MM-DD")
                this.getWOD(this.state.userInfo.program,date)

            })
            .catch(err => console.log(err));
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    addMovement = () => {
        if (this.state.movementName && this.state.reps) {
            const movement = { name: this.state.movementName, reps: this.state.reps, weight: this.state.weight,movementType:this.state.movementType }
            const movementArray = this.state.movementArray
            movementArray.push(movement)
            console.log(movementArray)
            this.setState({ movementArray: movementArray, movementName: "", reps: "", weight: "",movementType:"" })
        }

    }
    handleMovementChange = event => {
        console.log(this.state.movements)
        const { name, value } = event.target;
        let index;
        this.state.movements.forEach(movement => {
            for (let i = 0; i < this.state.movements.length; i++) {
                if (this.state.movements[i].name === value) {
                    index = i
                }
            }
        })
        const  movementType= this.state.movements[index].type
        console.log(index)
        console.log(movementType)
        this.setState({
                [name]: value,
                movementType: movementType
            });
        
       
    };
    
    deleteWorkout = id => {
        API.deleteWorkouts(id)
          .then(res => this.loadUser())
          .catch(err => console.log(err));
      };

    getRoundLength = array => {
        var roundLength = 0;
        for (let i = 0; i < array.length; i++) {
            roundLength += parseInt(array[i].reps)
        }
        return roundLength

    }
    handleFormSubmit = event => {
        event.preventDefault();
        let rawScore;  
        if (this.state.workoutType==="For Time") {
            rawScore = parseInt(this.state.minutes) * 60 + parseInt(this.state.seconds);
        } else {
            let roundLength = this.getRoundLength(this.state.movementArray)
            rawScore = parseInt(this.state.minutes)*roundLength + parseInt(this.state.seconds)
        }
        console.log(this.state.userInfo.userName)
       
        API.saveWorkoutsByUser({
            workoutType: this.state.workoutType,
            rounds: this.state.rounds,
            movements: this.state.movementArray,
            scores: { userName: this.state.userInfo.userName, firstName: this.state.userInfo.firstName, lastName: this.state.userInfo.lastName, score: rawScore },
            date: this.state.date,
            createdBy: this.state.userInfo.userName
        }
        ).then(res => this.loadUser(this.state.userInfo.userName))
            .catch(err => console.log(err));
    }
    changeDate = date => {
        this.setState({ date })
    }
    changeWODDate = date => {
        const newDate = moment(date, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DD")
        this.setState({wodDate:newDate})
        this.getWOD(this.state.userInfo.program, newDate)
    }
    submitScore =event => {
        event.preventDefault()
        console.log(this.state.minutes)
        let rawScore; 
        if (this.state.wod.workoutType === "For Time") {
            rawScore = parseInt(this.state.minutes) * 60 + parseInt(this.state.seconds);
        } else {
            let roundLength = this.getRoundLength(this.state.wod.movements)
            rawScore = parseInt(this.state.minutes) * roundLength + parseInt(this.state.seconds)
        }
        console.log(rawScore)
        API.submitScore({_id:this.state.wod._id},
            {scores:{ userName: this.state.userInfo.userName, firstName:this.state.userInfo.firstName,lastName:this.state.userInfo.lastName,score: rawScore }}
        ).then(res => this.loadUser(this.state.userInfo.userName))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <Container fluid>
                    <Row>
                        <Col size="md-4">
                            <div id="user">
                                <h5>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</h5>
                                <hr></hr>
                                <p className="image">Insert Photo Here: {this.state.image}</p>
                                <hr></hr>
                                <p>Age: {this.state.age}</p>
                                <p>Weight: {this.state.userInfo.weight}</p>
                                <p>Gym: {this.state.userInfo.program}</p>
                            </div>
                        </Col>

                       <Col size="md-4">
                            <div id="wod" >
                                <h5>{this.state.userInfo.program}'s Workout of the Day</h5>
                                <hr></hr>
                                {this.state.wod ? (
                                    <div className="div-wod-score">

                                        <p>{moment(this.state.wod.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</p>
                                        {this.state.wod.workoutType === "For Time" 
                                        
                                        ? <p>{this.state.wod.workoutType} {this.state.wod.rounds} Rounds</p> 
                                        
                                        : <p>{this.state.wod.workoutType} for {this.state.wod.rounds} minutes</p>}
                                        
                                        {this.state.wod.movements.map(movement => (
                                            <p>
                                                {movement.reps} {movement.movementType === "cardio" ? "m" : "x"} {movement.name}  {movement.movementType === "weight" ? `at ${movement.weight} lbs` : ""}{movement.movementType === "to height" ? `at ${movement.weight} inches` : ""}
                                            </p>
                                        ))}

                                    <div>
                                    
                                    <hr></hr>

                                    <div className="div-wod-score">

                                        <Row  key={this.state.wod._id}>
                                            <p className="div-wod-title">{this.state.wod.workoutType === "For Time" ? "Time: " : "Score: "}</p>
                                        
                                            <Input 
                                                className="wod-score-input"
                                                value={this.state.minutes}
                                                onChange={this.handleInputChange}
                                                name="minutes"
                                                placeholder={this.state.wod.workoutType === "For Time" ? "Minutes" : "Rounds"}
                                            />
                                         
                                            <h5>{this.state.wod.workoutType === "For Time" ? " : " : " + "}</h5>
                                            <Input
                                                className="wod-score-input"
                                                value={this.state.seconds}
                                                onChange={this.handleInputChange}
                                                name="seconds"
                                                placeholder={this.state.wod.workoutType === "For Time" ? "Seconds" : "Reps"}
                                            />
                                                                        
                                    <div> 
                                            <FormBtn 
                                                className="submit-score"
                                                disabled={!(this.state.seconds && this.state.minutes)}
                                                onClick={this.submitScore}
                                            >Submit Score
                                            </FormBtn>
                                    </div>

                                        </Row>
                                        </div>
                                        </div>
                                    </div>

                                ) : (<h6>There is no workout for: {this.state.wodDate}</h6>)}
                                <hr></hr>
                                <div className="calendar-div">
                                    <Calendar
                                        onChange={this.changeWODDate}
                                    />
                                </div>           
                            </div>
                        </Col>

                        <Col size="md-4">
                    <div id="logworkout">
                        <h5>Log a Workout </h5>
                        <hr></hr>

                            <form id="log-workouts">
                                <Row>
                                    <Dropdown className="dropdown"
                                        value={this.state.workoutType}
                                        onChange={this.handleInputChange}
                                        name="workoutType"
                                        placeholder="Workout"
                                    >
                                        <Option selected disabled value="" name="Workout Type" />
                                        <Option name="For Time" />
                                        <Option name="AMRAP" />
                                    </Dropdown>
                                </Row>

                                {this.state.workoutType ? (
                                    
                                    <div className="log-workouts">
                                        
                                        <Row>
                                            <Input className="wod-score-input"
                                                value={this.state.rounds}
                                                onChange={this.handleInputChange}
                                                name="rounds"
                                                placeholder={this.state.workoutType === "For Time" ? "Rounds: " : "Time"}
                                            />
                                            <h5>{this.state.workoutType==="For Time" ? "Rounds" : "Minutes"} </h5>
                                        </Row>

                                        {this.state.movementArray.length ? (
                                            <List>

                                                {this.state.movementArray.map(movement => (
                                                    <Row>
                                                        <Col size="md-4">
                                                            <p>{movement.reps} {movement.movementType === "cardio" ? "m" : "x"} </p>
                                                        </Col>
                                                        <Col size="md-4">
                                                            <p>{movement.name}</p>
                                                        </Col>
                                                        {movement.movementType === "weight" || movement.movementType === "to height" ? (
                                                            <Col size="md-4">
                                                                {movement.movementType === "weight" ? <p>at {movement.weight} lbs</p> : <p>to {movement.weight} inches</p>}
                                                            </Col>
                                                        ) : ("")}
                                                    </Row>
                                                ))}
                                            </List>
                                        ) : ("")}

                                        <hr></hr>
                                        <Row>
                                            <Dropdown
                                                className="dropdown"
                                                value={this.state.movementName}
                                                onChange={this.handleMovementChange}
                                                name="movementName"
                                                placeholder="Movement"
                                            >
                                                <Option selected disabled value="" name="Add Movement" />
                                                {this.state.movements.map(movement => (
                                                    <Option name={movement.name} key={movement._id} />
                                                ))}
                                            </Dropdown>
                                        </Row>

                                            {this.state.movementName ? (
                                                <Row className="div-wod-score">
                                            <Input className="wod-score-input"
                                                        value={this.state.reps}
                                                        onChange={this.handleInputChange}
                                                        name="reps"
                                                        placeholder={this.state.movementType === "cardio" ? "Distance" : "Reps"}
                                                    />
                                                    {this.state.movementType=== "weight" || this.state.movementType=== "to height" ? (
                                            <Input className="wod-score-input"
                                            value={this.state.weight}
                                                            onChange={this.handleInputChange}
                                                            name="weight"
                                                            placeholder={this.state.movementType === "weight" ? "Weight" : "Height"}

                                                        />
                                                    ):("")}                                             
                                                    
                                                    <SaveBtn class="submit-movement"
                                                        disabled={!(this.state.movementName && this.state.reps)}
                                                        onClick={() => this.addMovement()} />
                                                </Row>
                                            ) : ("")}
                                        <hr></hr>

                                        <Row className="div-wod-score">
                                            <h5>{this.state.workoutType === "For Time" ? "Time: " : "Score: "}</h5>
                                            <Input className="wod-score-input"
                                                value={this.state.minutes}
                                                onChange={this.handleInputChange}
                                                name="minutes"
                                                placeholder={this.state.workoutType === "For Time" ? "Minutes" : "Rounds"}
                                            />
                                            <h5>{this.state.workout === "For Time" ? " : " : " + "}</h5>
                                            <Input className="wod-score-input"
                                                value={this.state.seconds}
                                                onChange={this.handleInputChange}
                                                name="seconds"
                                                placeholder={this.state.workoutType === "For Time" ? "Seconds" : "Reps"}
                                            />
                                        </Row>
                                        <hr></hr>

                                        <div>
                                            <Calendar
                                                className="calendar-div"
                                                onChange={this.changeDate}
                                            />
                                        </div>
                                        <FormBtn
                                            className="submit-button"
                                            disabled={!(this.state.workoutType && this.state.rounds && this.state.movementArray && this.state.minutes)}
                                            onClick={this.handleFormSubmit}
                                        >
                                            Log Workout
                                         </FormBtn>
                                    </div>

                                ) : ("")}
                              
                            </form>
                            </div>
                           </Col>
                       </Row>
                
                
                <Row>
                        <Col size="md-12">
                            <div id="workouts">
                                <h5>Recent Workouts</h5>

                                <hr></hr>


                            {this.state.workouts.length ? (
                                <div>
                                
                                <Row>

                                <table className="table table-sm fluid">
         
                                    {this.state.workouts.map(workout => (
                                        <Row key={workout._id}>
                                          
                                        <td>{moment(workout.date, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY")}</td>
                                        <td><span className="table-lables">Type: </span> {workout.workoutType}</td>
                                        
                                        {workout.movements.map(movement => (
                                        <td>
                                        <p><span className="table-lables">Movement: </span>
                                                        {movement.reps} {movement.movementType === "cardio" ? "m" : "x"} 
                                                        {movement.name}  
                                                        {movement.movementType === "weight" ? `at ${movement.weight} lbs` : ""}
                                                        {movement.movementType === "to height" ? `at ${movement.weight} inches` : ""}
                                                    </p>
                                                    </td>
                                                ))}
                                        

                                        {workout.scores.map(score => 
                                            <td>        
                                                    {score.userName === this.state.userInfo.userName && workout.workoutType ==="For Time" ? (
                                                    <p><span className="table-lables">Time:</span>{Math.floor(score.score / 60)}:{score.score % 60}</p>) : ("")}

                                                    {score.userName === this.state.userInfo.userName && workout.workoutType === "AMRAP" ? (

                                                        <p><span className="table-lables">Score:</span> {Math.floor(score.score / this.getRoundLength(workout.movements))} Rounds + {score.score % this.getRoundLength(workout.movements)} Reps</p>
                                                     ) : ("")} 
                                            </td>
                                        )}

                                        <td>{workout.workoutType === "AMRAP" ? <p> For {workout.rounds} minutes</p>:""}
                                                    {workout.workoutType === "For Time" ? <p>
                                                    {workout.rounds}</p> : ""}
                                        </td>

                                        <td>
                                            <DeleteBtn class="submit-button" onClick={() => this.deleteWorkout(workout._id)}>X</DeleteBtn>
                                        </td>
    
                                       </Row>
                                        
                                    ))}

                                    </table>

                                    </Row>
                                </div>
                            ) : ("")}

                            </div>
                        </Col>
                        
                    </Row>

                </Container>

            </div>
        );
    }
}

export default User

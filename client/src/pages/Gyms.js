import MessageBoard from "../components/MessageBoard/MessageBoard";
import React, {Component} from "react";
import API from "../utils/API";
import {Col, Row, Container} from "../components/Grid";
import "./style.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import WOD from "../components/WOD"
import LogWorkout from "../components/LogWorkout/LogWorkout";

import "react-datepicker/dist/react-datepicker.css";

class Gym extends Component {
  state = {
    gym: "",
    members: [],
    workouts: [],
    messages: [],
    movements: [],
    isAuthenticated :JSON.parse(localStorage.getItem("tokens"))
  };

  componentDidMount() {
    const gym = this.props.match.params.name;
    const date = moment().format("YYYY-MM-DD");
    console.log(date);
    this.getMovements()

    this.setState({gym: gym, date: date});
    this.loadUsers(gym);
  }

  loadUsers = (gym) => {
    API.getGymUsers(gym)
      .then((res) => {
        console.log(res.data.workouts)
        let user = {}
        let WOD = this.getWOD(res.data.workouts,this.state.date)
        if (this.state.isAuthenticated.admin) {
          user ={
            userName:this.state.isAuthenticated.name,
            firstName: this.state.isAuthenticated.name,
            lastName: "(admin)"
          }
        } else {
          for (let i = 0; i < res.data.users.length; i++) {
            if (this.state.isAuthenticated.userName === res.data.users[i].userName) {
              user = res.data.users[i]
            }
          }
        }
        if (!res.data.messages.length) {
          res.data.messages.sort((a, b) => a.date - b.date);
        }
        this.setState({
          workouts:res.data.workouts,
          messages: res.data.messages,
          members: res.data.users,
          user: user,
          wod: WOD

        });
      })
      .catch((err) => console.log(err));
  };
  handleFormSubmit = (date, workoutType, rounds, movementArray) => {

    API.createWOD({
      workoutType: workoutType,
      rounds: rounds,
      movements: movementArray,
      date: date,
      createdBy: this.state.user.userName
    }
    ).then(res => {
      var workouts = this.state.workouts
      workouts.push(res.data)
      this.setState({workouts:workouts})
    })
      .catch(err => console.log(err));
  }
  getMovements = () => {
    API.getMovements()
      .then(res => {
        this.setState({ movements: res.data })
      })
      .catch(err => console.log(err));
  }
  getWOD = (workouts, date) => {
    let WOD = workouts.filter(workout => moment(workout.date).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) || []
    if (!(WOD.length===0)) {
      if (WOD[0].workoutType === "For Time") {
        WOD[0].scores.sort((a, b) => a.score - b.score);
      } else {
          WOD[0].scores.sort((a, b) => b.score - a.score);
      }
    }
    return WOD[0]
      
    };
  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  };
  changeDate = date => {
    console.log(date)
    this.setState({ date })
  }
  sendNewMessage = (message) => {
    console.log(this.state.user.userName)
    let messageObject = {
      message: message,
      userName: this.state.user.userName,
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      date: new Date().toString(),
    };
    this.setState({newMessage:""})
    API.saveMessage(this.state.gym,messageObject).then(res =>this.loadUsers(this.state.gym))
  };
  getRoundLength = (array) => {
    var roundLength = 0;
    for (let i = 0; i < array.length; i++) {
      roundLength += parseInt(array[i].reps);
    }
    return roundLength;
  };
  changeWODDate = (date) => {
    const newDate = moment(date, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DD");
    let WOD = this.getWOD(this.state.workouts, newDate);
    this.setState({date: newDate,wod:WOD });
    
  };
  render() {
    return (
      <div className="container">
        <Container fluid>
          <Row>
      
            <Col size="md-4">
              <div id="wod">
                <h5>
                  {this.state.gym}'s Workout of the Day: {this.state.date}
                </h5>
                <hr></hr>
                <div>
                  Change WOD Date:
                  <DatePicker
                    className="datepicker btn"
                    onChange={this.changeWODDate}
                  />
                </div>
                <hr></hr>

                {this.state.wod ? (<WOD
                  wod={this.state.wod}
                  wodDate={this.state.wodDate}
                />
                  
                ) : (
                  <h6>There is no workout for: {this.state.date}</h6>
                )}
              </div>
              <>
                  {this.state.isAuthenticated.admin ? (
                <div className="log-workout">
                    <h5>Add Workout of the Day</h5>
                    <hr></hr>
                    <LogWorkout
                      movements={this.state.movements}
                      handleFormSubmit={this.handleFormSubmit}
                      changeDate={this.changeDate}
                    />
                </div>
                  ):""}
                </>  
                
            </Col>
            <Col size="md-4">
              <div id="scores">
                <h5>WOD Scores:</h5>
                <hr></hr>
                {this.state.wod ? (
                  <div>
                    {this.state.wod.scores.map((score) => (
                      <Row>
                        <Col size="md-4">
                          
                              <i className="large material-icons" style={{ fontSize: 40 }}>account_circle</i>
                        </Col>
                        <Col size="md-4">
                          {score.firstName} {score.lastName}
                        </Col>
                        <Col size="md-4">
                          {this.state.wod.workoutType === "For Time" ? (
                            <p>
                              Time: {Math.floor(score.score / 60)}:
                              {(score.score % 60) < 10 ? "0" + score.score % 60 : score.score % 60}
                            </p>
                          ) : (
                            ""
                          )}
                          {this.state.wod.workoutType === "AMRAP" ? (
                            <p>
                              Score:{" "}
                              {Math.floor(
                                score.score /
                                  this.getRoundLength(this.state.wod.movements)
                              )}{" "}
                              Rounds +{" "}
                              {score.score %
                                this.getRoundLength(
                                  this.state.wod.movements
                                )}{" "}
                              Reps
                            </p>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                    ))}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>
            <Col size="md-4">
              <MessageBoard
                user = {this.state.user}
                messages = {this.state.messages ? this.state.messages:""}
                sendNewMessage = {this.sendNewMessage}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Gym;

import Chat from "../components/Chat/index";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import API from "../utils/API";
import {Col, Row, Container} from "../components/Grid";
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import "./style.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Input, FormBtn } from "../components/Form";
import { List, ListItem} from "../components/List"
import "react-datepicker/dist/react-datepicker.css";

class Gym extends Component {
  state = {
    gym: "",
    members: [],
    workouts: [],
    messages: [],
    newMessage: ""
  };

  componentDidMount() {
    const gym = this.props.match.params.name;
    const date = moment().format("YYYY-MM-DD");
    console.log(date);

    this.setState({gym: gym, date: date});
    this.loadUsers(gym);
    this.getWOD(gym, date);
  }

  loadUsers = (gym) => {
    API.getGymUsers(gym)
      .then((res) => {
        const isAuthenticated= JSON.parse(localStorage.getItem("tokens"));
        let user = {}
        for (let i=0;i<res.data.users.length;i++) {
          if (isAuthenticated.userName===res.data.users[i].userName) {
            user = res.data.users[i]
          }
        }
        if (!res.data.messages.length) {
          res.data.messages.sort((a, b) => a.date - b.date);
        }
        this.setState({
          messages: res.data.messages,
          members: res.data.users,
          user: user
        });
      })
      .catch((err) => console.log(err));
  };
  getWOD = (gym, date) => {
    console.log(date);
    API.getWOD({createdBy: gym, date: date})
    .then((res) => {
      if (!(res.data === null)) {
        if (res.data.workoutType === "For Time") {
          res.data.scores.sort((a, b) => a.score - b.score);
        } else {
          res.data.scores.sort((a, b) => b.score - a.score);
        }
      }
      this.setState({
        wod: res.data,
      });
    });
  };
  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  };
  sendNewMessage = () => {
    let messageObject = {
      message: this.state.newMessage,
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
    this.setState({date: newDate});
    this.getWOD(this.state.gym, newDate);
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

                {this.state.wod ? (
                  <div className="div-wod-score">
                    {this.state.wod.workoutType} {this.state.wod.rounds} Rounds
                    {this.state.wod.movements.map((movement) => (
                      <p key={movement._id}>
                        {movement.reps}{" "}
                        {movement.movementType === "cardio" ? "m" : "x"}{" "}
                        {movement.name}{" "}
                        {movement.movementType === "weight"
                          ? `at ${movement.weight} lbs`
                          : ""}
                        {movement.movementType === "to height"
                          ? `at ${movement.weight} inches`
                          : ""}
                      </p>
                    ))}
                  </div>
                ) : (
                  <h6>There is no workout for: {this.state.date}</h6>
                )}
              </div>
            </Col>
            <Col size="md-4">
              <div id="scores">
                <h5>WOD Scores:</h5>
                <hr></hr>
                {this.state.wod ? (
                  <div>
                    {this.state.wod.scores.map((score) => (
                      <Row>
                        <Col size="md-6">
                          {score.firstName} {score.lastName}
                        </Col>
                        <Col size="md-6">
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
              <div id="members">
                <h5>Message Board:</h5>
                <hr></hr>
                {this.state.messages ? (
                  <List>
                    {this.state.messages.map(message =>(
                      <ListItem >
                        <span>{message.firstName} {message.lastName}: {message.message} <p className="float-right">{moment(message.date, "YYYY-MM-DDTHH:mm").format("MM/DD HH:mm")}</p></span>
                      </ListItem>
                    ))}
                  </List>
                ):("")}
                <div>
                <Input
                  onChange={this.updateNewMessage}
                  value={this.state.newMessage}
                  onChange={this.handleInputChange}
                  name="newMessage"
                />
                <FormBtn className="submit" type="button" value="send" onClick={this.sendNewMessage}>
                Post Message</FormBtn>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Gym;

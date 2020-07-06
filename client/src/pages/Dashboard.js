import React, {Component} from "react";
import {Link} from "react-router-dom";
import {SaveBtn} from "../components/Buttons/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import {Col, Row, Container} from "../components/Grid";
import {List, ListItem} from "../components/List";
import {Input, FormBtn, Dropdown, Option} from "../components/Form";
import "./style.css";

class Dashboard extends Component {
  state = {
    userInfo: {},
    workouts: [],
    workoutFollowers: ["Bob", "Amy", "John"],
  };

  componentDidMount() {
    // const gym = this.props.match.params.name;
    // this.loadUsers(gym);
  }
  loadUser = (gym) => {
    API.getGymUsers(gym)
      .then((res) => {
        console.log(res.data.workouts);
        this.setState({
          userInfo: res.data,
          workouts: res.data.workouts,
        });
      })
      .catch((err) => console.log(err));
  };
  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <Container fluid bgImage="/dashboard_background.jpg">
        <Row>
          <Col size="md-6">
            <Jumbotron>Workout of the Day</Jumbotron>
            <Jumbotron>
              Following the workout:
              <br></br>
              {this.state.workoutFollowers.map((item) => {
                return <button>{item}</button>;
              })}
            </Jumbotron>
          </Col>
          <Col size="md-6">
            <Jumbotron>Chat</Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;

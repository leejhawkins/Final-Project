import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


class Workouts extends Component {
  state = {
    workouts: []
  };

  componentDidMount() {
    this.loadWorkouts();
  }

  loadWorkouts = () => {
    API.getWorkouts()
      .then(res => this.setState({ workouts: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Choose Workouts for the Week</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" />
              <Input name="catgory" placeholder="Author (required)" />
              <TextArea name="description" placeholder="Description (Optional)" />
              <FormBtn>Submit Workout</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Workouts On My List</h1>
            </Jumbotron>
            {this.state.workouts.length ? (
              <List>
                {this.state.workouts.map(workouts => (
                  <ListItem key={workouts._id}>
                    <a href={"/workouts/" + workouts._id}>
                      <strong>
                        {workouts.title} and {workouts.category}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Workouts;

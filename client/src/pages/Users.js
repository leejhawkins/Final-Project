import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import "./style.css";
import "../components/LogWorkout/LogWorkout"
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LogWorkout from "../components/LogWorkout/LogWorkout";
import UserWorkouts from "../components/UserWorkouts";
import WOD from "../components/WOD"


class User extends Component {
    state = {
        userInfo: {},
        workouts: [],
        movements: [],
        scoreSubmitted: [],
        week: {
            beginWeek: moment().weekday(0).format("YYYY-MM-DD"),
            endWeek: moment().weekday(6).format("YYYY-MM-DD"),
            week: 0,
        }
    };

    componentDidMount() {
        const userName = this.props.match.params.name
        this.getMovements()
        this.loadUser(userName)
    }
    getWOD = (gym, date) => {
        API.getWOD({ createdBy: gym, date: date })
            .then(res => {
                var scoreSubmitted = []
                if (res.data) {
                     scoreSubmitted =res.data.scores.filter(score => score.userName === this.state.userInfo.userName)
                }
                this.setState({
                    wod: res.data,
                    scoreSubmitted: scoreSubmitted
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
    getWeekWorkouts = (workouts, beginWeek, endWeek) => {
        let weekWorkouts = [];
        workouts.forEach(workout => {

            if (workout.date > beginWeek && workout.date < endWeek) {
                weekWorkouts.push(workout)
                console.log(workout)
            }
        })
        return weekWorkouts
    }
    loadUser = userName => {
        API.getUser(userName)
            .then(res => {
                const weekWorkouts = this.getWeekWorkouts(res.data.workouts, this.state.week.beginWeek, this.state.week.endWeek)
                console.log(weekWorkouts)
                const stats = this.stats(res.data.workouts, res.data.userName)
                this.setState({
                    userInfo: res.data, workouts: weekWorkouts, workoutType: "",
                    dateOfBirth: moment(res.data.dateOfBirth, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY"),
                    age: moment(Date()).diff(res.data.dateOfBirth, 'years', true).toFixed(0),
                    stats: stats,
                })
                const date = moment().format("YYYY-MM-DD")
                this.setState({ wodDate: date })
                this.getWOD(this.state.userInfo.program, date)
                this.getCrossFitWOD(moment(date, "YYYY-MM-DD").format('YYMMDD'));
            })
            .catch(err => console.log(err));
    }
    getCrossFitWOD = date => {
        API.getCrossFitWOD(date).then(res => {
            console.log(res.data);
            this.setState({ CrossFitWOD: res.data });
        })
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    deleteWorkout = (id, createdBy, scoreId) => {
        console.log(id)
        if (createdBy === this.state.userInfo.userName) {
            API.deleteWorkout(id)
                .then(res => this.loadUser(this.state.userInfo.userName))
                .catch(err => console.log(err));
        } else {
            API.deleteWOD(id, { userName: this.state.userInfo.userName, _id: scoreId })
                .then(res => this.loadUser(this.state.userInfo.userName))
                .catch(err => console.log(err));
        }
    };
    getRoundLength = array => {
        var roundLength = 0;
        for (let i = 0; i < array.length; i++) {
            roundLength += parseInt(array[i].reps)
        }
        return roundLength
    }
    handleFormSubmit = (date, workoutType, rounds, movementArray, minutes, seconds) => {
        let rawScore;
        if (workoutType === "For Time") {
            rawScore = parseInt(minutes) * 60 + parseInt(seconds);
        } else {
            let roundLength = this.getRoundLength(movementArray)
            rawScore = parseInt(minutes) * roundLength + parseInt(seconds)
        }
        API.saveWorkoutsByUser({
            workoutType: workoutType,
            rounds: rounds,
            movements: movementArray,
            scores: { userName: this.state.userInfo.userName, firstName: this.state.userInfo.firstName, lastName: this.state.userInfo.lastName, score: rawScore },
            date: date,
            createdBy: this.state.userInfo.userName
        }
        ).then(res => this.loadUser(this.state.userInfo.userName))
            .catch(err => console.log(err));
    }
    changeDate = date => {
        console.log(date)
        this.setState({ date })
    }
    changeWODDate = date => {
        const newDate = moment(date, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DD")
        this.setState({ wodDate: newDate })
        this.getWOD(this.state.userInfo.program, newDate)
        this.getCrossFitWOD(moment(newDate, "YYYY-MM-DD").format('YYMMDD'));
    }
    submitScore = event => {
        event.preventDefault()
        console.log(this.state.wod._id)
        let rawScore;
        if (this.state.wod.workoutType === "For Time") {
            rawScore = parseInt(this.state.minutes) * 60 + parseInt(this.state.seconds);
        } else {
            let roundLength = this.getRoundLength(this.state.wod.movements)
            rawScore = parseInt(this.state.minutes) * roundLength + parseInt(this.state.seconds)
        }
        API.submitScore({ _id: this.state.wod._id },
            { scores: { userName: this.state.userInfo.userName, firstName: this.state.userInfo.firstName, lastName: this.state.userInfo.lastName, score: rawScore } }
        ).then(res => {
            this.setState({ seconds: "", minutes: "" })
            this.loadUser(this.state.userInfo.userName)
        })

            .catch(err => console.log(err));
    }

    stats = (array, userName) => {
        let countWorkout = array.length;
        var sumMinutes = 0;
        let stats = {};
        var roundsArray = []
        for (let i = 0; i < array.length; i++) {
            if (array[i].workoutType === "AMRAP") {
                for (let j = 0; j < array[i].scores.length; j++) {
                    if (array[i].scores[j].userName === userName) {
                        sumMinutes += parseInt(array[i].rounds);
                        roundsArray.push(parseInt(array[i].rounds))
                        console.log("Total Minutes: " + sumMinutes);
                    }
                }
            }
            else {
                for (let j = 0; j < array[i].scores.length; j++) {
                    if (array[i].scores[j].userName === userName) {
                        sumMinutes += parseInt(array[i].scores[j].score / 60);
                        roundsArray.push(parseInt(array[i].scores[j].score / 60));
                    }
                }
            }
        }
        stats = { countWorkout: countWorkout, sumMinutes: sumMinutes, rounds: roundsArray }
        return stats;
    }
    changeWeek = value => {
        const week = this.state.week.week + parseInt(value)
        const beginWeek = moment().weekday(week * 7).format("YYYY-MM-DD")
        const endWeek = moment().weekday(week * 7 + 6).format("YYYY-MM-DD")
        const weekWorkouts = this.getWeekWorkouts(this.state.userInfo.workouts, beginWeek, endWeek)
        this.setState({ week: { beginWeek: beginWeek, endWeek: endWeek, week: week }, workouts: weekWorkouts })

    }

    render() {
        return (
            <div className="container container-fluid">
                <Container fluid>
                    <Row className="container-fluid">
                        <Col size="md-4" className="container-fluid">
                            <div id="user" className="container-fluid">
                                <h5>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</h5>
                                <hr></hr>
                                <div className="media d-flex align-items-center">
                                    {this.state.userInfo.image ? (
                                        <img className="rounded-circle mr-3"
                                            src={this.state.userInfo.image}
                                            alt="User"
                                        />
                                    ) : (
                                            <i className="large material-icons" style={{ fontSize: 80 }}>account_circle</i>
                                        )}

                                    <div className="media-body">
                                        <p>Age: {this.state.age}</p>
                                        <p>Weight: {this.state.userInfo.weight}</p>
                                        <p>Gym: {this.state.userInfo.program}</p>
                                        {this.state.stats ? (
                                            <div>
                                                <p>Workouts: {this.state.stats.countWorkout}</p>
                                                <p>Minutes:{this.state.stats.sumMinutes}</p>
                                            </div>
                                        ) : ("")
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="log-workout">
                                <h5>Log a Workout </h5>
                                <hr></hr>
                                <LogWorkout
                                    movements={this.state.movements}
                                    handleFormSubmit={this.handleFormSubmit}
                                    date={this.state.date}
                                    changeDate={this.changeDate}
                                />
                            </div>

                        </Col>

                        <Col size="md-4">
                            <div id="wod" >
                                <h5>{this.state.userInfo.program}'s Workout of the Day</h5>
                                <hr></hr>
                                <div>
                                    <div>Date:
                                        <DatePicker
                                            type="button"
                                            className="datepicker btn"
                                            onChange={this.changeWODDate}
                                            name="select date"
                                        />
                                    </div>
                                </div>
                                <hr></hr>
                                {this.state.wod ? (
                                    <div>
                                        <WOD
                                            wod={this.state.wod}
                                            wodDate={this.state.wodDate}
                                        />
                                        <div>
                                            <hr></hr>
                                            <div className="div-wod-score">
                                                <Row key={this.state.wod._id}>
                                                    {this.state.scoreSubmitted.length ===0 ? (
                                                        <>
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
                                                                    className="submit"
                                                                    disabled={!(this.state.seconds && this.state.minutes)}
                                                                    onClick={this.submitScore}
                                                                >Submit Score
                                                        </FormBtn>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h5>Your Score</h5>
                                                            <UserWorkouts
                                                                user={this.state.userInfo}
                                                                workout={this.state.wod}
                                                                deleteWorkout={this.deleteWorkout}
                                                                getRoundLength={this.getRoundLength}
                                                            />
                                                        </>
                                                    )}

                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                ) : ("")}
                                {this.state.CrossFitWOD && !this.state.wod ? (
                                    <div>
                                        <h5>CrossFit's WOD for {moment(this.state.wodDate).format("MM/DD/YYYY")}</h5>
                                        <h6>{this.state.CrossFitWOD.map(item => (

                                            <p>{item}</p>
                                        ))}</h6>
                                    </div>) : ("")}
                            </div>
                        </Col>
                        <Col size="md-4">
                            <div id="workouts">
                                <h5><i className="material-icons" role="button" onClick={() => this.changeWeek(-1)}>fast_rewind</i>
                                    <i className="material-icons">date_range</i>  Workouts {moment(this.state.week.beginWeek).format("MM/DD/YYYY")} - {moment(this.state.week.endWeek).format("MM/DD/YYYY")}
                                    <i className="material-icons" role="button" onClick={() => this.changeWeek(1)}>fast_forward</i></h5>
                                <hr></hr>
                                {this.state.workouts.length ? (
                                    <div>
                                        {this.state.workouts.map(workout => (
                                            <UserWorkouts
                                                user={this.state.userInfo}
                                                workout={workout}
                                                deleteWorkout={this.deleteWorkout}
                                                getRoundLength={this.getRoundLength}
                                            />
                                        ))} 
                                        
                                    </div>
                                ):""}
                                
                            </div>
                        </Col>
                    </Row>
                </Container >
            </div >
        )
    }
};

export default User

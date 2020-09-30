import axios from "axios";

export default {

  getMovements: function () {
    return axios.get("/api/movements");
  },
  getGymUsers: function (gym) {
    return axios.get("/api/programs/"+gym);
  },
  saveMessage: function (gym,messageData) {
    return axios.put("/api/programs/"+gym,messageData)
  },
  getWOD: function (workoutData) {
    return axios.get("/api/workouts/"+workoutData.createdBy+"/"+ workoutData.date)

  },
  createWOD: function(workoutData) {
    console.log(workoutData)
    return axios.post("/api/workouts/" + workoutData.createdBy + "/" + workoutData.date,workoutData)
  },
  submitScore: function (id,workoutData) {
    return axios.put("/api/workouts/"+id._id,workoutData)
  },
  editScore: function (id,workoutData) {
    console.log(id)
    return axios.put("/api/workouts/" + id.workoutId +"/" + id.scoreId, workoutData)
  },
  getWorkouts: function (id) {
    return axios.get("/api/workouts/" + id);
  },
  deleteWOD: function(id, userData) {
    console.log(id)
    return axios.put("/api/users/" + id, userData);
  },
  deleteWorkout: function (id) {
    return axios.delete("/api/workouts/" + id);
  },
  saveWorkoutsByUser: function (workoutData) {
    console.log(workoutData.createdBy)
    return axios.post("/api/workouts/" + workoutData.createdBy, workoutData);
  },
  getUsers: function () {
    return axios.get("/api/users")
  },
  getUser: function (userName) {
    return axios.get("/api/users/" + userName);
  },
  checkPassword: function (userData) {
    return axios.get("/api/users/" + userData.userName + "/" + userData.password);
  },
  checkGymPassword: function (programData) {
    return axios.get("/api/programs/" + programData.userName + "/" + programData.password);
  },
  createUser: function (userData) {
    return axios.post("/api/users", userData)
  },
  createProgram: function(programData) {
    return axios.post("/api/programs",programData)
  },
  getPrograms() {
    return axios.get("api/programs")
  },
  getCrossFitWOD(date) {
    console.log(date);
    return axios.get("/scrape/" + date )
     }
};

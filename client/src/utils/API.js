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
    console.log(workoutData)
    return axios.get("/api/workouts/"+workoutData.createdBy+"/"+ workoutData.date)

  },
  submitScore: function (id,workoutData) {
    return axios.put("/api/workouts/"+id._id,workoutData)
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
    return axios.post("/api/workouts/" + workoutData.scores.userName, workoutData);
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
  createUser: function (userData) {
    return axios.post("/api/users", userData)
  },
  getPrograms() {
    return axios.get("api/programs")
  },
  getCrossFitWOD(date) {
    console.log(date);
    return axios.get("/scrape/" + date )
     }
};


import axios from "axios";

export default {

  getMovements: function () {
    return axios.get("/api/movements");
  },
  getWorkouts: function () {
    return axios.get("/api/workouts");
  },
  getWorkouts: function (id) {
    return axios.get("/api/workouts/" + id);
  },
<<<<<<< HEAD

  deleteWorkouts: function (id) {
    return axios.delete("/api/workouts/" + id);
  },

  saveWorkouts: function (workoutData) {
=======
  deleteWorkouts: function(id) {
    return axios.delete("/api/workouts/" + id);
  },
  saveWorkouts: function(workoutData) {
>>>>>>> origin/logout
    let name = workoutData.createdBy
    return axios.post("/api/workouts/" + name, workoutData);
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
  }
<<<<<<< HEAD

=======
>>>>>>> origin/logout
};

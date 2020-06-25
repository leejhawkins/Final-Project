import axios from "axios";

export default {
  // Gets all workouts
  getWorkouts: function() {
    return axios.get("/api/workouts");
  },
  // Gets the book with the given id
  getWorkouts: function(id) {
    return axios.get("/api/workouts/" + id);
  },
  // Deletes the book with the given id
  deleteWorkouts: function(id) {
    return axios.delete("/api/workouts/" + id);
  },
  // Saves a book to the database
  saveWorkouts: function(workoutData) {
    return axios.post("/api/workouts", workoutData);
  },
  getUsers: function() {
    return axios.get("/api/users")
  },
  getUser: function(userName) {
    return axios.get("/api/users/"+userName);
  },
  createUser: function(userData) {
    return axios.post("/api/users",userData)
  }
};

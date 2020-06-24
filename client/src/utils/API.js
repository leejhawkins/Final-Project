import axios from "axios";

export default {
  // Gets all workouts
  getWorkouts: function() {
    return axios.get("/api/workouts");
  },
  // Gets the book with the given id
  getWorkout: function(id) {
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
  createUser: function(userData) {
    return axios.post("api/users/",userData)
  },
  getUser: function(userData) {
    return axios.get("/api/users/"+ userData.userName)
  }
};

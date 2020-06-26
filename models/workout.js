const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workoutType: String,
    rounds: Number,
    movementName: [String],
    movementReps: [Number],
    movementWeight: [Number],
    time: Number,
    createdBy: String
    
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
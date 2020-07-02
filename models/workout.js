const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workoutType: String,
    rounds: Number,
    movements: [
        {
            name: String,
            reps: Number,
            weight: Number
        }
    ],
    scores: [
        {
            userName: String,
            score: Number
        }
    ]
    
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
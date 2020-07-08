const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workoutType: String,
    rounds: Number,
    movements: [
        {
            name: String,
            reps: Number,
            weight: Number,
            movementType: String
        }
    ],
    scores: [
        {
            userName: String,
            firstName: String,
            lastName: String,
            score: Number
        }
    ],
    date: {
        type: Date, 
        default: Date.now
    },
    createdBy: String
    
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
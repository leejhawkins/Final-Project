const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    type: String,
    rounds: Number,
    movements: [
        {
            name: String,
            reps: Number,
            weight: Number, 
        },

    ],
    time: Number,
    createdBy: String
    
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
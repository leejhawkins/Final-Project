const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workoutType: String,
    rounds: Number,
    movements: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movement"
        }
    ],
    movementReps: [Number],
    movementWeight: [Number],
    time: Number,
    createdBy: String
    
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
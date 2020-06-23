const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    type: String,
    movements: [
        {name: {type:String,required:true} ,reps:{type:Number,required:true},weight:Number}
    ],
    user: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the Note model
            score: Schema.Types.score,
            ref: "User",
            
        },
            
    ]
    
});

const Workout = mongoose.model("Workout", workOutSchema);

module.exports = Workout;
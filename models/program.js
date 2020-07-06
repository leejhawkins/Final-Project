const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programSchema = new Schema({
    name: {type:String,required:true},
    users: [
        {
        type: Schema.Types.ObjectId,
        ref: "User"
        },
    ],
    workouts: [
        {
            type:Schema.Types.ObjectId,
            ref: "Workout"
        },
    ],
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
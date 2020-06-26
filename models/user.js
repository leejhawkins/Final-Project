const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type:String,required:true},
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: Date,
    weight: Number,
    program: String,
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Workout",
            score: Number

        },

    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type:String,required:true},
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    image: String,
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be longer."
        ]
    },
    dateOfBirth: Date,
    weight: Number,
    program: String,
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Workout",


        },
     
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String,required:true},
    users: [
        {
        type: Schema.Types.ObjectId,
        ref: "User"
        },
    ],
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Workout",

        },

    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
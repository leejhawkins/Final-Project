const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: Date,
    weight: Number,
    dateCreated: { type: Date, default: Date.now },
    workout: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the Note model
            score: Number,
            ref: "Workout",

        },

    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
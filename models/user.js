const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: string, required: true },
    dateofBirth:{ type:date, required:true},
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
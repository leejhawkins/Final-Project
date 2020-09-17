const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const programSchema = new Schema({
    name: {type:String,required:true},
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
    messages: [ {
        message: String,
        userName: String,
        firstName: String,
        lastName: String,
        date: Date
    }

    ]
});

const Program = mongoose.model("Program", programSchema);
module.exports = Program;
module.exports.createProgram = function (newProgram, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newProgram.password, salt, function (err, hash) {
            newProgram.password = hash;
            Program.create(newProgram).then(program => callback(program))


        });
    });
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
module.exports = Program;
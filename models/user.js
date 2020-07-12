const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
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
module.exports.createUser = function (newUser,callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            User.create(newUser).then(user => callback(user))
            
            
        });
    });
}


module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config();

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@ds139331.mlab.com:39331/heroku_qsv472z6",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const movementSeed = [
    {
        name: "C2B Pull Ups",
        type: "body weight"
    },
    {
        name: "Row - Calories",
        type: "cal cardio"
    },
    {
        name: "Hang Power Clean",
        type: "weight"
    },
    {
        name: "Squat Snatch",
        type: "weight"
    }
];

db.Movement.collection.insertMany(movementSeed)
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


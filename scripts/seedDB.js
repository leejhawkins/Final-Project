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
        name: "Thruster",
        type: "weight"
    },
    {
        name: "Pull Up",
        type: "body weight"
    },
    {
        name: "Run",
        type: "Cardio"
    },
    {
        name: "Box Jump",
        type: "to height"
    }
];

db.Movement
    .remove({})
    .then(() => db.Movement.collection.insertMany(movementSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
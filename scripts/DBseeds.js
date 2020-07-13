const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config();
const moment =require("moment")


mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@ds139331.mlab.com:39331/heroku_qsv472z6",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const workoutSeed = [
    {
        workoutType: "AMRAP",
        rounds: 10,
        movements: [
            {
                name: "Burpee Box Jump Overs",
                reps: 12,
                weight: 24,
                movementType: "to height"
            },
            {
                name: "Deadlifts",
                reps: 12,
                weight: 185,
                movementType: "weight"
            }
        ],
        date: new Date(moment("7/13/2020", "MM/DD/YYYY").format("YYYY-MM-DDTHH:mm")),
        createdBy: "Omnia"

    },
    {
    workoutType: "For Time",
    rounds: 3,
    movements: [
        {
            name: "Row",
            reps: 20,
            movementType: "cardio"
        },
        {
            name: "Single Arm DB Thruster",
            reps: 20,
            weight: 50,
            movementType: "weight"
        },
        {
            name: "Alt. DB Snatch",
            reps: 20,
            weight: 50,
            movementType: "weight"
        },

    ],
        date: new Date(moment("7/14/2020", "MM/DD/YYYY").format("YYYY-MM-DDTHH:mm")),
        createdBy: "Omnia"

    },
    {
        workoutType: "For Time",
        rounds: 3,
        movements: [
            {
                name: "Bike",
                reps: 15,
                movementType: "cardio"
            },
            {
                name: "Power Clean",
                reps: 10,
                weight: 95,
                movementType: "weight"
            },
            {
                name: "Toes-to-Bar",
                reps: 20,
                movementType: "body weight"
            },

        ],
        date: new Date(moment("7/15/2020", "MM/DD/YYYY").format("YYYY-MM-DDTHH:mm")),
        createdBy: "Omnia"

    },
    {
        workoutType: "AMRAP",
        rounds: 9,
        movements: [
            {
                name: "Double Unders",
                reps: 100,
                movementType: "body weight"
            },
            {
                name: "Russian Kettlebell Swings",
                reps: 25,
                weight: 53,
                movementType: "weight"
            },
            {
                name: "Burpee",
                reps: 20,
                movementType: "body weight"
            },

        ],
        date: new Date(moment("7/16/2020", "MM/DD/YYYY").format("YYYY-MM-DDTHH:mm")),
        createdBy: "Omnia"

    },
    {
        workoutType: "AMRAP",
        rounds: 12,
        movements: [
            {
                name: "Run",
                reps: 400,
                movementType: "cardio"
            },
            {
                name: "Pull Ups",
                reps: 20,
                movementType: "body weight"
            },
            {
                name: "Run",
                reps: 400,
                movementType: "cardio"
            },
            {
                name: "Overhead Squat",
                reps: 20,
                weight: 115,
                movementType: "weight"
            },
            {
                name: "Run",
                reps: 400,
                movementType: "cardio"
            },
            {
                name: "Pull Ups",
                reps: 20,
                movementType: "body weight"
            },
            {
                name: "Run",
                reps: 400,
                movementType: "cardio"
            },
            {
                name: "Clusters",
                reps: 20,
                weight: 115,
                movementType: "weight"
            },


        ],
        date: new Date(moment("7/17/2020", "MM/DD/YYYY").format("YYYY-MM-DDTHH:mm")),
        createdBy: "Omnia"

    },

]
db.Workout
    db.Workout.collection.insertMany(workoutSeed)
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
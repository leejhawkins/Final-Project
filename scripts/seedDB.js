const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config();

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://leejhawkins:hotsauce26@ds139331.mlab.com:39331/heroku_qsv472z6",
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
        type: "cardio"
    },
    {
        name: "Box Jump",
        type: "to height"
    }
];
const programSeed = [
    {
        name:"Omnia"
    },
    {
        name:"Crossfit/general"
    },
    {
        name: "Other/Stay at home dad"
    }
]
const workoutSeed = [
    {
        workoutType:"For Time",
        rounds: 3,
        movements: [
            {
                name:"Thruster",
                reps: 21,
                weight: 95,
                movementType: "weight"
            },
            {
                name:"Pull Up",
                reps: 15,
                movementType: "body weight"
            }
        ],
        date: Date.now()

    }

]

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
db.Program
    .remove({})
    .then(() => db.Program.collection.insertMany(programSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

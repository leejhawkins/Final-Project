const db = require("../models");
const moment = require("moment")


module.exports = {
    findAll: function (req, res) {
        db.Workout
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Workout
            .findById(req.params.id)
            .then(dbModel => {
                console.log("populating")
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    createWOD: function (req, res) {
        var workout = {}
        db.Workout
            .create(req.body)
            .then(dbWorkout => {
                workout = dbWorkout
                return db.Program.findOneAndUpdate({ name: req.params.createdBy }, { $push: { workouts: dbWorkout._id } }, { new: true });
            })
            .then(dbProgram => {
                res.json(workout)
            })
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Workout
            .create(req.body)
            .then(dbWorkout => {
                return db.User.findOneAndUpdate({ userName: req.params.name }, { $push: { workouts: dbWorkout._id } }, { new: true });
            })
            .then(dbUser => {
                console.log(dbUser)
                res.json(dbUser)
            })
            .catch(err => res.status(422).json(err));
    },
    editScore: function (req,res) {
        const score = req.body.scores
        const _id = req.params.scoreId
        console.log(score)

        db.Workout
            .findOneAndUpdate({ _id: req.params.workoutId }, { $pull: { scores: { _id: _id } } })
            .then(dbWorkout => {
                return db.Workout.findOneAndUpdate({ _id: dbWorkout._id }, { $push: { scores: score}  })
            }) 
            .then(dbUser => {
                res.json(dbUser)
            })
            .catch(err => res.status(422).json(err))
    },
    submitScore: function (req, res) {
        const userName = req.body.scores.userName
        console.log(userName)
        
        db.Workout
            .findOneAndUpdate({ _id: req.params.id }, { $push: { scores: { userName: userName,firstName:req.body.scores.firstName,lastName:req.body.scores.lastName, score: req.body.scores.score } } })
            .then(dbWorkout => {
                return db.User.findOneAndUpdate({ userName: userName }, { $push: { workouts: dbWorkout._id } }, { new: true });
            })
            .then(dbUser => {
                res.json(dbUser)
            })
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Workout
            .findOneAndDelete({ _id: req.params.id })
            .then(dbWorkout => {
                console.log(dbWorkout)
                return db.User.findOneAndUpdate({ userName: dbWorkout.createdBy }, { $pull: { workouts: dbWorkout._id } });
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getWOD: function (req, res) {
        const minDate = moment(req.params.date, "YYYY-MM-DD").format("YYYY-MM-DDT00:00")
        const maxDate = moment(req.params.date, "YYYY-MM-DD").format("YYYY-MM-DDT23:59")
        console.log(minDate,maxDate,req.params.date)
        db.Workout
            .findOne({ createdBy: req.params.createdBy, date: { $gte: minDate, $lte: maxDate } })
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    }
};

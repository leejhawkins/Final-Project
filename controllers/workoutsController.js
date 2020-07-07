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
                console.log(dbModel)
                res.json(dbModel)})
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Workout
            .create(req.body)
            .then(dbWorkout => {
                return db.User.findOneAndUpdate({ userName: req.params.name }, { $push: { workouts:dbWorkout._id }}, { new: true });
            })
            .then(dbUser => {
                console.log(dbUser)
                res.json(dbUser)})
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Workout
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Workout
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getWOD: function (req,res) {
        const minDate = moment(req.params.date,"YYYY-MM-DD").format("YYYY-MM-DDT00:00")
        const maxDate = moment(req.params.date, "YYYY-MM-DD").format("YYYY-MM-DDT23:59")
        console.log(maxDate)
        db.Workout
            .findOne({createdBy:req.params.createdBy,date:{$gte:minDate,$lte:maxDate}})
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel)})
            .catch(err => res.status(422).json(err));
    }
};

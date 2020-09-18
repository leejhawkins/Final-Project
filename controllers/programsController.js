const db = require("../models");
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

module.exports = {
    findAll: function (req, res) {
        db.Program
            .find(req.query)
            .then(dbModel => {
                res.json(dbModel)
            })

            .catch(err => res.status(422).json(err));
    },
    findOne: function (req, res) {
        db.Program
            .findOne({name:req.params.program})
            .populate("users")
            .populate("workouts")
            .then(dbModel => {
                res.json(dbModel)
            }).catch(err => res.status(422).json(err));
    },
    create: function (req,res) {
        console.log(req.body)
        db.Program.createProgram(req.body,function(dbProgram) {
            return db.Program.create(dbProgram)
                .then(dbProgram => res.json(dbProgram))
                .catch(err => res.status(422).json(err));
        })
    },
    saveMessage: function (req,res) {
        console.log(req.body)
        db.Program
            .findOneAndUpdate({name:req.params.program}, {
                $push: {
                    messages:{
                        message:req.body.message,
                        userName:req.body.userName,
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        date: req.body.date
                    }}})
                        .then(dbModel => {
                            res.json(dbModel)
                        }).catch(err => res.status(422).json(err));
    

    },
    checkPassword: function (req, res) {
        const newStrategy = new LocalStrategy(req.params.userName, req.params.password)
        passport.use(newStrategy,
            db.Program.findOne({ name: req.params.userName }).then(dbProgram => {
                db.Program.comparePassword(newStrategy._verify, dbProgram.password, function (err, isMatch) {
                    console.log(isMatch)
                    if (err) throw err;
                    if (isMatch) {
                        res.json(dbProgram);
                    } else {
                        res.status(422).json(err);
                    }
                });
            })
            .catch(err => res.status(422).json(err))

        )

    }
}
const db = require("../models");

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
            .then(dbModel => {
                res.json(dbModel)
            }).catch(err => res.status(422).json(err));
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
    

    }
}
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
    }
}
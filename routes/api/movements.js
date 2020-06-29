const router = require("express").Router();
const movementsController = require("../../controllers/movementsController");

router.route("/")
    .get(movementsController.findAll);

module.exports = router;
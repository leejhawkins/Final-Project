const router = require("express").Router();
const programsController = require("../../controllers/programsController");

router.route("/")
    .get(programsController.findAll);
router.route("/:program")
    .get(programsController.findOne)

module.exports = router;
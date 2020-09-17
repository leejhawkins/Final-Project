const router = require("express").Router();
const programsController = require("../../controllers/programsController");

router.route("/")
    .get(programsController.findAll)
    .post(programsController.create)
router.route("/:program")
    .get(programsController.findOne)
    .put(programsController.saveMessage)
router
    .route("/:userName/:password")
    .get(programsController.checkPassword)

module.exports = router;
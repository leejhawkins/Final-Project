const router = require("express").Router();
const workoutsController = require("../../controllers/workoutsController");


// Matches with "/api/workouts"
router.route("/")
    .get(workoutsController.findAll)

router.route("/:name")
    .post(workoutsController.create)

// Matches with "/api/workouts/:id"
router
    .route("/:id")
    .get(workoutsController.findById)
    .put(workoutsController.submitScore)
    .delete(workoutsController.remove);

router.route("/:createdBy/:date")
    .get(workoutsController.getWOD)





module.exports = router;

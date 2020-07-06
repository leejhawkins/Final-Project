const router = require("express").Router();
const userRoutes = require("./users");
const workoutRoutes = require("./workouts");
const movementRoutes = require("./movements");
const programRoutes = require("./programs")


router.use("/users", userRoutes);
router.use("/workouts",workoutRoutes);
router.use("/movements",movementRoutes);
router.use("/programs",programRoutes)

module.exports = router;

const router = require("express").Router();
const userRoutes = require("./users");
const workoutRoutes = require("./workouts");
const movementRoutes = require("./movements")


router.use("/users", userRoutes);
router.use("/workouts",workoutRoutes);
router.use("/movements",movementRoutes)

module.exports = router;

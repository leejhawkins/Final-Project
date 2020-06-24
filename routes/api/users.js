const router = require("express").Router();
const usersController = require("../../controllers/usersController");


// Matches with "/api/user"
router.route("/")
    .get(usersController.findAll)
    .post(usersController.create);

// Matches with "/api/users/:id"
router
    .route("/:userName")
    .get(usersController.findOne)
    .put(usersController.update)
    .delete(usersController.remove);





module.exports = router;

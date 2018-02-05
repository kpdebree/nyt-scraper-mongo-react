const router = require("express").Router();
const Controller = require("../../controllers/controller");

// Matches with "/api/article"
router.route("/")
  .get(Controller.findAll)
  .post(Controller.create);

// Matches with "/api/article/:id"
router
  .route("/:id")
  .get(Controller.findById)
  .put(Controller.update)
  .delete(Controller.remove);

module.exports = router;

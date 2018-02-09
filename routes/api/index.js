const router = require("express").Router();
const Routes = require("./article");

// Book routes
router.use("/articles", Routes);

module.exports = router;

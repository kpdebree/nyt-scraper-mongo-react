const router = require("express").Router();
const Routes = require("./article");

// Book routes
router.use("/article", Routes);

module.exports = router;

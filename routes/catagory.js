const express = require("express");
const router = express.Router();

// require controller modules.
const messageboard_controller = require("../controllers/messageBoardController");

// GET catalog of home page
router.get("/", messageboard_controller.index);

// SIGN IN //

module.exports = router;
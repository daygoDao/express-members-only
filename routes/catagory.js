const express = require("express");
const router = express.Router();

// require controller modules.
const messageboard_controller = require("../controllers/messageBoardController");
const user_controller = require("../controllers/userController")

// GET catalog of home page
router.get("/", messageboard_controller.index);

// SIGN IN //
router.get("/sign-up", user_controller.sign_up)

// LOG IN //


module.exports = router;
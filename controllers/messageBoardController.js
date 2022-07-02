// const User = require("../models/user")

const async = require("async");

exports.index = function (req, res) {
  res.render("index", { title: "Nerd Message Board", user: req.user });
};


// list messages from newest to oldest
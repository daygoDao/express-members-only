const async = require("async");

exports.index = function (req, res) {
  res.render("index", { title: "ayo from msgBoardController" });
};

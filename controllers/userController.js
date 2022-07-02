const User = require("../models/user");

exports.sign_up = function (req, res, next) {
    console.log('sign_up, witin userController: ' + req.body)
    res.render('sign-up-form')
}
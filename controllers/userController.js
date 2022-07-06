const User = require("../models/user");
const { body, validationResult, check } = require("express-validator");

exports.sign_up_get = function (req, res, next) {
  console.log("sign_up, witin userController: " + req.body);
  res.render("sign-up-form", {
    errors: undefined,
    user: undefined,
  });
};

exports.sign_up_post = [
  // validate and sanitize
  body("first_name")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlpha()
    .withMessage("First name must only contain letters (a-zA-Zl)."),
  body("last_name")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("Last name must be specified")
    .isAlpha()
    .withMessage("Last name must only contain letters (a-zA-Zl)."),
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("min length of 4")
    .escape()
    .withMessage("username must be specified")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric (a-zA-Z0-9)"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("must atleast be 8 character length")
    .escape()
    .isStrongPassword()
    .withMessage("atleast: min-length = 8, minLowerCase = 1, minUpperCase = 1, minNumbers = 1, minSymbols = 1"),
  check("passwordConfirmation", 'passwordConfirmation field must habe the same value as the password field')
    .exists()
    .custom((value, { req }) => value === req.body.password),  
  // process request after validated and sanitized
  (req, res, next) => {
    //extract the validation errors from a request
    const errors = validationResult(req);

    // create user obj w/ escaped and trimmed data
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      membership_status: 'bot',
    });

    if(!errors.isEmpty()) {
      console.log('contains errors', errors.array())
      //there are errors, render form again w/ sanitized values/errors messages
      console.log(user)
      res.render("sign-up-form", {
        errors: errors.array(),
        user: user,
      })
      return;
    } else {
      // data from form is valid
      user.save(function (err) {
        if(err) {
          return next(err);
        }
        // success - redirect to new user account settings
        res.redirect('/')
      });
    }
  },
];

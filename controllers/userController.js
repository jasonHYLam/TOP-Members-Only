const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const { body, validationResult } = require('express-validator');

exports.user_signup_get = asyncHandler( async (req, res, next) => {
  res.render('signup', {
    title: 'Sign up',
  })
});

exports.user_signup_post = [

    // this is validating and sanitizing the data
    body('firstName')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

    body('lastName')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),

    body('username')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Username must be specified."),

    body('password')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Password must be specified."),

    body('confirmPassword')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Please confirm password.")
    .custom((value, {req}) => value === req.body.password)
    .withMessage("Passwords must match."),
    

    // determine if password is the same
    // maybe determine if username has already been taken?
    // i think in both cases, i need to implement a custom validator, to return boolean whether valid or not.

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const user = new User({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        });

        if (!errors.isEmpty()) {
            res.render('signup', {
                title: "Sign up",
                //populate with previously chosen 
                user: user,
                errors: errors.array(),
            })
        }

        else {
            await user.save();
            // Where do i redirect to?
            res.redirect()
        }
    })

    
]
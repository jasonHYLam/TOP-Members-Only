require('dotenv').config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const passport = require('passport');
require('../config/passport')(passport); // not sure if this is the way to go 

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
    // is it possible to determine if username has already been taken? surely that's an async function... how do i...

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

        const errors = validationResult(req);

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
            // use bycrypt here
            // i may have to add a try catch for errors...
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {

                if (err) return next(err);

                const userEncrypted = new User({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    username: req.body.username,
                    password: hashedPassword,
                    membership_status: false,
                })

                await userEncrypted.save();

                // Where do i redirect to?
                res.redirect('/membership')
            })

        }
    })
]

exports.join_club_get = asyncHandler( async(req, res, next) => {
    res.render('membership', {
        title: 'Join Membership'
    })
})

exports.join_club_post = asyncHandler( async(req, res, next) => {

    if (req.body.membershipPassword === process.env.MEMBERSHIP_PASSWORD) {
        const latestUsers = await User.find().sort({ _id: -1 }).limit(1);
        const latestUser = latestUsers[0];
        latestUser.membership_status = true;
        await latestUser.save();
    }

    res.redirect('/home')

})

exports.home_get = asyncHandler(async (req, res, next) => {
    res.render('home', {})
})

exports.user_login_get = asyncHandler(async (req, res, next) => {
    res.render('login', {
        title: 'Login',
    })
})

exports.user_login_post = [
    body('username')
    .trim()
    .isLength({ min: 1})
    .escape(),

    body('username')
    .trim()
    .isLength({ min: 1})
    .escape(),


    asyncHandler(async (req, res, next) => {

        const errors = validationResult(req);
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        })
        
        if (!errors.isEmpty()) {
            res.render('login', {
                title: 'Login',
                user: user,
                errors: errors.array(),
            })
        }

        else {
            passport.authenticate('local', {
                successRedirect: '/home',
                failureRedirect: '/login',
            },

            // is this callback function necessary? apparently it is... check dcord
            (err, user) => {
                if (err) next(err);
                req.login(user, next);
            }
            )(req, res, next);
        }
    })
]

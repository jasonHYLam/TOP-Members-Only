const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const { body, validationResult } = require('express-validator');

exports.user_signup_get = asyncHandler( async (req, res, next) => {
  res.render('signup', {
    title: 'Sign up',
  })
});

exports.user_signup_post = [

]
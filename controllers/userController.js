const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.user_signup_get = asyncHandler( async (req, res, next) => {
  res.render('signup', {
    title: 'Sign up',
  })
});
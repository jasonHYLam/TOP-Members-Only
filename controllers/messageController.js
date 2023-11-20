const Message = require('../models/message');

const asyncHandler = require('express-async-handler');

const { body, validationResult }= require('express-validator');

exports.message_form_get = asyncHandler( async (req, res, next) => {
    res.render('message', {
        title: 'New Message',
    })
})

const Message = require('../models/message');

const asyncHandler = require('express-async-handler');

const { body, validationResult } = require('express-validator');

exports.message_form_get = asyncHandler( async (req, res, next) => {
    res.render('message', {
        title: 'New Message',
    })
})

exports.message_form_post = [
    body('title')
    .trim()
    .isLength({ min: 1})
    .escape(),

    body('message')
    .trim()
    .isLength({ min: 1})
    .escape(),

    asyncHandler(async (req, res, next) => {

        // find User in MongoDB that matches req.user.username.

        const errors = validationResult(req);
        const message = new Message({
            title: req.body.title,
            message: req.body.message,
            timeStamp: new Date(),

        }) 

        if (!errors.isEmpty()) {
            res.render('message', {
                title: 'New Message',
                message: message,
                errors: errors.array(),
            })
        }

        else {
            await message.save()
            res.redirect('/home')
        }
    })

]

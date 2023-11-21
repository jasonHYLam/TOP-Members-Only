const Message = require('../models/message');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

const { body, validationResult } = require('express-validator');

exports.message_form_get = asyncHandler( async (req, res, next) => {
    res.render('message', {
        title: 'New Message',
        user: req.user,
    })
});

exports.message_form_post = [
    body('title')
    .trim()
    .isLength({ min: 1})
    .escape(),

    body('text')
    .trim()
    .isLength({ min: 1})
    .escape(),

    asyncHandler(async (req, res, next) => {

        // find User in MongoDB that matches req.user.username.
        const matchingUser = await User.findOne({ username: req.user.username });

        const errors = validationResult(req);
        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            author: matchingUser,
            timeStamp: new Date(),
        }) 
            console.log('NEW MESSAGE CREATED')

        if (!errors.isEmpty()) {
            console.log('CEHCKING FOR ERRORS:')
            console.log(errors)
            res.render('message', {
                title: 'New Message',
                text: text,
                errors: errors.array(),
            })
        }

        else {
            console.log('BEFORE SAVING:')
            await message.save()
            console.log('SAVED')
            res.redirect('/home')
        }
    })

]

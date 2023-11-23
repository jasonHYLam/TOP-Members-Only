const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', userController.user_signup_get);
router.post('/sign-up', userController.user_signup_post);

router.get('/membership', userController.join_club_get);
router.post('/membership', userController.join_club_post);

router.get('/home', userController.home_get);

router.get('/login', userController.user_login_get);
router.post('/login', userController.user_login_post);

router.get('/message', messageController.message_form_get);
router.post('/message', messageController.message_form_post);

router.get('/messages/:id/delete', messageController.message_delete_get)
router.delete('/messages/:id/delete', messageController.message_delete_post)

router.get('/admin', userController.admin_form_get);
router.post('/admin', userController.admin_form_post);

module.exports = router;

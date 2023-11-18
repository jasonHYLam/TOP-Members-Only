const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

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

module.exports = router;

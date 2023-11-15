const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', userController.user_signup_get);

module.exports = router;

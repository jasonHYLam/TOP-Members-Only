const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', (req, res, next) => {
  res.render('signup', {
    title: 'Sign up',
  })
})

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { username: req.session.user[0].name });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/adminMgmt', function(req, res) {
  res.render('adminMgmt');
});

router.get('/userMgmt', function(req, res) {
  res.render('userMgmt');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

module.exports = router;


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main', function(req, res) {
  res.render('adminMain', { title: 'Hello, World!' });
});

router.get('/adminMgmt', function(req, res) {
  res.render('adminMgmt', {});
});

router.get('/user/main', function(req, res) {
  res.render('userMain', { title: 'Hello, World!' });
});

router.get('/user/userMgmt', function(req, res) {
  res.render('userMgmt', {});
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

module.exports = router;


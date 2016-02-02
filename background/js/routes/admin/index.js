var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 1200000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

router.use(function (req, res, next) {
  var url = req.originalUrl;
  if (url != "/admin/login" && !req.session.user) {
    if (url === "/api/admin/login") {
      next()
    }
    else {
      return res.redirect("/admin/login");
    }
  }
  next();
});

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


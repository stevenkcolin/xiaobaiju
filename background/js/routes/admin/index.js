var express = require('express');
var router = express.Router();

// 拦截器
router.use(function (req, res, next) {
    var url = req.originalUrl;
    //if (url != "/admin/login" && !req.session.user) {
    //    if (url === "/api/admin/login") {
    //        next()
    //    }
    //    else {
    //        return res.redirect("/admin/login");
    //    }
    //}
    next();
});

/* GET home page. */
router.get('/index', function (req, res, next) {
    res.render('index', {username: req.session.user[0].name});
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/adminMgmt', function (req, res) {
    res.render('adminMgmt');
});

router.get('/userMgmt', function (req, res) {
    res.render('userMgmt');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/templateMgmt',function(req,res) {
    res.render('templateMgmt');
})

module.exports = router;


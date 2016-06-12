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
    res.render('index');
});

router.get('/login', function (req, res) {
    res.render('login1');
});

router.get('/adminMgmt', function (req, res) {
    res.render('adminMgmt');
});

router.get('/userMgmt', function (req, res) {
    res.render('userMgmt');
});

router.get('/login', function (req, res, next) {
    res.render('login1');
});

router.get('/templateMgmt',function(req,res) {
    res.render('templateMgmt');
});

router.get('/actiontypeMgmt',function(req,res){
    res.render('actiontypeMgmt');
});

router.get('/postActionsMgmt',function(req,res){
    res.render('postActionsMgmt');
});



module.exports = router;


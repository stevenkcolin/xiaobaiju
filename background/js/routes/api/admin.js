/**
 * Created by Pengfei on 2015/11/24.
 * router for /admin url
 */

var express = require("express");
var _ = require('underscore');

var models = require("../../models/model");
var successHandler = require("../../common/successHandler");
var Admin = models.ADMIN;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
	req.isRouted = true;
	next();
});


// create a admin
router.post("/create", function(req, res, next) {
	var admin = new Admin();
	//if (req.body.password) req.body.password = md5encrypt.encrypt(req.body.password);
	_.extend(admin, req.body);
    admin.createDate = new Date();
    admin.save(function(err, doc){
		if (err) throw err;
		successHandler.handle(doc, res);
	});
});

// delete admin
router.post("/delete", function(req, res, next) {
	var adminIdsArray = req.body.adminIds.split(",");

    Admin.remove({"_id" : {"$in" : adminIdsArray } },function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    })

});

// update admin
router.post("/update", function(req, res, next) {
    var adminId = req.body.adminId;
    var param = req.body;
    Admin.update({"_id" : adminId}, {$set:param},function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    })
});

// find admin by id
router.post("/searchById", function(req, res) {
    var adminId = req.body.adminId;
    var searchCondition = {"_id": adminId};

    Admin.find(searchCondition,function(err,doc){
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// find admin by search condition
router.post("/searchByCondition", function(req, res, next) {

    if (typeof req.body.name === "undefined") {
        successHandler.handle(null, res);
        return;
    }

    var name = req.body.name;
    var loginAccount = req.body.loginAccount;
    var searchCondition = {"name": new RegExp(name, 'i'),"loginAccount": loginAccount};
    if (name === '') {
        delete searchCondition.name;
    }
    if (loginAccount === '') {
        delete searchCondition.loginAccount;
    }

    var page=req.body.page;
    var rows=req.body.rows;
    var startLine = (page-1)*rows;
    var dbSearch = Admin.find(searchCondition).limit(+rows).skip(startLine);

    dbSearch.exec(function(err,rs){
        if(err){
            throw err;
        }else{
            //计算数据总数
            Admin.find(searchCondition, function(err,result){
                res.json({rows:rs,total:result.length});
            });

        }
    });

});

// admin login
router.post("/login", function(req, res, next) {
    var userid = req.body.userid;
    var userpwd = req.body.userpwd;
    //var encoded = req.body.encoded;
    //if (encoded !== true) {
    //    password = md5encrypt.encrypt(password);
    //}
    Admin.find({loginAccount: userid, password: userpwd}, function(err, doc) {
        if (err) throw err;
        if (doc.length > 0) {
            req.session.user = doc;
            successHandler.handle(doc, res);
        } else if (doc.length === 0) {
            res.json({"status": "fail"})
        }

    });
});

// login by 3rd
router.post("/loginByOther", function(req, res, next) {
    var loginFrom = req.body.loginFrom;
    var loginAccount = req.body.loginAccount;
    User.find({loginFrom: loginFrom, loginAccount: loginAccount}, function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

// 定义 about 页面的路由
router.get('/about', function(req, res) {
	res.send('About birds');
});

module.exports = router;
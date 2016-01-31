/**
 * Created by Pengfei on 2015/11/24.
 * router for /user url
 */

var express = require("express");
var _ = require('underscore');

var models = require("../models/model");
var md5encrypt = require("../common/md5encrypt");
var successHandler = require("../common/successHandler");
var User = models.USER;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
	req.isRouted = true;
	next();
});


// create a user
router.post("/create", function(req, res, next) {
	var user = new User();
	if (req.body.password) req.body.password = md5encrypt.encrypt(req.body.password);
	_.extend(user, req.body);
	user.createDate = new Date();
	user.save(function(err, doc){
		if (err) throw err;
		successHandler.handle(doc, res);
	});
});

// delete user
router.post("/delete", function(req, res, next) {
	var userIdsArray = req.body.userIds.split(",");
	//var testIds = userIds.split(",");
	//var jsonIdArray = new Array();
	//for (var i = 0; i < testIds.length; i ++)  {
	//	var id = '{'+ '"' + '_id' + '"' + ':' + '"' + testIds[i] + '"' + '}';
	//	//var jsonId = eval("(" + id + ")");
	//	var jsonId = JSON.parse(id);
	//	jsonIdArray.push(jsonId);
	//}

    User.remove({"_id" : {"$in" : userIdsArray } },function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    })

});

// update user
router.post("/update", function(req, res, next) {
    var userId = req.body.userId;
    var param = req.body;
    //delete param._id;
    console.log(param);
    User.update({"_id" : userId}, {$set:param},function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    })
});

// find user by id
router.post("/searchById", function(req, res) {
    var userId = req.body.userId;
    var searchCondition = {"_id": userId};

    User.find(searchCondition,function(err,doc){
        if (err) throw err;
        successHandler.handle(doc, res);
    });

    //var id = req.params.id;
    //User.findById(userId, function(err, doc) {
		//if (err) throw err;
		//successHandler.handle(doc, res);
    //});


});

// find user by search condition
router.post("/searchByCondition", function(req, res, next) {

    if (typeof req.body.name === "undefined") {
        successHandler.handle(null, res);
        return;
    }

    var name = req.body.name;
    var loginFrom = req.body.loginFrom;
    var searchCondition = {"name": new RegExp(name, 'i'),"loginFrom": loginFrom};
    if (name === '') {
        delete searchCondition.name;
    }
    if (loginFrom === '') {
        delete searchCondition.loginFrom;
    }

    var page=req.body.page;
    var rows=req.body.rows;
    var startLine = (page-1)*rows;
    var dbSearch = User.find(searchCondition).limit(+rows).skip(startLine);

    dbSearch.exec(function(err,rs){
        if(err){
            throw err;
        }else{
            //计算数据总数
            User.find(searchCondition, function(err,result){
                res.json({rows:rs,total:result.length});
            });

        }
    });

});

// login by phone and password
router.post("/login", function(req, res, next) {
    var phone = req.body.phone;
    var password = req.body.password;
    var encoded = req.body.encoded;
    if (encoded !== true) {
        password = md5encrypt.encrypt(password);
    }
    User.find({phone: phone, password: password}, function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
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

//router.post("/find", function(req, res) {
//    User.find(req.body, function(err, doc) {
//        if (err) throw err;
//        successHandler.handle(doc, res);
//    });
//});

//// get a user by id
//router.get("/:id", function(req, res, next) {
//	var id = req.params.id;
//	User.findById(id, function(err, doc) {
//		if (err) throw err;
//		successHandler.handle(doc, res);
//	});
//});

// get all users
//router.get("/", function(req, res, next) {
//	User.find(function(err, doc) {
//		if (err) throw err;
//		successHandler.handle(doc, res);
//	});
//});

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/main', function(req, res) {
    res.render('userMain', { title: 'Hello, World!' });
});

router.get('/searchUser', function(req, res) {
    res.render('searchUser', {});
});

// 定义 about 页面的路由
router.get('/about', function(req, res) {
	res.send('About birds');
});

module.exports = router;
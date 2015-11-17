/**
 * Created by Pengfei on 2015/11/9.
 * user router for /user url
 */


var express = require("express");
var _ = require('underscore');

var models = require("../models/model");
var User = models.User;

var router = express.Router();

// create a user
router.post("/create", function(req, res, next) {
	var user = new User();
	_.extend(user, req.body);
	user.save(function(err){
		if (err) throw err;
		next();
	});
});

// get a user by id
router.get("/:id", function(req, res, next) {
	var id = req.params.id;
	if (id) {} else {
		next();
	}
});

// get all users
router.get("/", function(req, res, next) {
	User.find(function(err, doc) {
		if (err) throw err;
		req.result = doc;
		next();
	});
});

// 定义 about 页面的路由
router.get("/about", function(req, res) {
	res.send("About birds");
});

module.exports = router;
﻿/**
 * Created by Pengfei on 2015/11/9.
 * user router for /user url
 */


var express = require("express");
var _ = require('underscore');

var models = require("../models/model");
var md5encrypt = require("../common/md5encrypt");
var successHandler = require("../common/successHandler");
var User = models.User;

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
	user.save(function(err){
		if (err) throw err;
		successHandler.handle(null, res);
	});
});

// login by phone and password
router.post("/login", function(req, res, next) {
	var phone = req.body.phone;
	var password = req.body.password;
	password = md5encrypt.encrypt(password);
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

// get a user by id
router.get("/:id", function(req, res, next) {
	var id = req.params.id;
	User.findById(id, function(err, doc) {
		if (err) throw err;
		successHandler.handle(doc, res);
	});
});

// get all users
router.get("/", function(req, res, next) {
	User.find(function(err, doc) {
		if (err) throw err;
		successHandler.handle(doc, res);
	});
});

// 定义 about 页面的路由
router.get("/about", function(req, res) {
	res.send("About birds");
});

module.exports = router;
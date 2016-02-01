/**
 * Created by Pengfei on 2015/11/24.
 * router for /user url
 */

var express = require("express");
var _ = require('underscore');

var models = require("../../models/model");
var md5encrypt = require("../../common/md5encrypt");
var successHandler = require("../../common/successHandler");
var User = models.USER;
var userService = require('../../service/userService');

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
	req.isRouted = true;
	next();
});


// create a user
router.post("/create", function(req, res, next) {
	userService.create(req, res, next);
});

// delete user
router.post("/delete", function(req, res, next) {
    userService.delete(req, res, next);
});

// update user
router.post("/update", function(req, res, next) {
    console.log("route");
    userService.update(req, res, next);
});

// find user by id
router.get("/searchById", function(req, res, next) {
    userService.searchById(req, res, next);
});

// find user by search condition
router.get("/searchByCondition", function(req, res, next) {
    userService.searchByCondition(req, res, next);
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

module.exports = router;
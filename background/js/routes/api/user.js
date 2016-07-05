/**
 * Created by Pengfei on 2015/11/24.
 * router for /user url
 */

var express = require("express"),
    _ = require('underscore'),
    assert = require('assert'),
    models = require("../../models/model"),
    md5encrypt = require("../../common/md5encrypt"),
    successHandler = require("../../common/successHandler"),
    errorHandler = require("../../common/errorHandler"),
    User = models.User,
    userService = require('../../service/userService'),
    router = express.Router(),
    constant = require('../../common/constant');

// set a flag
router.all("*", function(req, res, next) {
	req.isRouted = true;
	next();
});

// get all Users
router.get("/", function(req, res, next) {
    var start = req.query.start || 0;
    var rows = req.query.rows || constant.DEFAULT_PAGE_ROWS;
    userService.getAll(start, rows).then(
        function (doc) {
            successHandler.handle(doc, res);
        }
    )
    //var result = userService.getAll(start, rows);
    //successHandler.handle(result, res);
});


// create a user
router.post("/create", function(req, res, next) {
    var user = req.body.user,
        operatorId = req.body.operatorId;
	userService.create(user).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// delete user
router.delete("/delete", function(req, res, next) {
    var userIds = req.body.ids;
    assert.notEqual(userIds, null, 'ids is null');
    assert.notEqual(0, userIds.length, 'ids is null');
    userService.delete(userIds).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// update user
router.post("/update", function(req, res, next) {
    var userId = req.body.id;
    var user = req.body.user;
    var operatorId = req.body.operatorId;
    assert.notEqual(userId, null, 'id is null');
    assert.notEqual(user, null, 'user is null');
    assert.notEqual(operatorId, null, 'operatorId is null');
    userService.update(userId, user, operatorId).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// find user by id
router.get("/searchById", function(req, res, next) {
    var id = req.query.id;
    assert.notEqual(id, null);
    userService.searchById(id).then(
        function(doc){
            successHandler.handle(doc, res)
        });
});

// find user by search condition
router.get("/searchByCondition", function(req, res, next) {
    var condition = {};
    if (req.query.nickName)  condition.nickName = req.query.nickName;
    if (req.query.loginFrom) condition.loginFrom = req.query.loginFrom;
    if (req.query.loginAccount) condition.loginAccount = req.query.loginAccount;
    var start = req.query.start || 0;
    var rows = req.query.rows || constant.DEFAULT_PAGE_ROWS;
    userService.searchByCondition(condition, start, rows).then(
        function(doc){
            successHandler.handle(doc, res)
        });
});

// login by phone and password
router.post("/login", function(req, res, next) {
    var loginAccount = req.body.loginAccount;
    var password = req.body.password;
    var encoded = req.body.encoded;
    if (encoded !== true) {
        password = md5encrypt.encrypt(password);
    }
    var condition = {loginAccount: loginAccount, password: password, loginFrom: constant.LOGIN_FROM_TEL};
    userService.searchOneByCondition(condition).then(
        function(doc){
            successHandler.handle(doc, res)
        });
});

// login by 3rd
router.post("/loginByOther", function(req, res, next) {
    var loginFrom = req.body.loginFrom;
    var loginAccount = req.body.loginAccount;
    var condition = {loginAccount: loginAccount, loginFrom: loginFrom};
    userService.searchOneByCondition(condition).then(
        function(doc){
            successHandler.handle(doc, res)
        });
});

module.exports = router;
/**
 * Created by Pengfei on 2015/11/24.
 * router for /admin url
 */

var express = require("express");
var _ = require('underscore');
var assert = require("assert");

var models = require("../../models/model");
var successHandler = require("../../common/successHandler");
var errorHandler = require("../../common/errorHandler");
var adminService = require('../../service/adminService');
var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
	req.isRouted = true;
	next();
});

// admin login
router.post("/login", function(req, res, next) {
    var name = req.body.name,
        password= req.body.password;

    assert.notEqual(name, null);
    assert.notEqual(password, null);

    adminService.login(name, password).then(
        function(doc) {
            successHandler.handle(doc, res);
        },
        function(err){
            errorHandler.handle(err, req, res);
        }
    );
});

// admin change password
router.post("/updatePwd", function(req, res, next) {
    var adminId = req.body._id;
    var newPwd = req.body.password;
    var operatorId = req.body.operatorId;
    assert.notEqual(newPwd, null);

    adminService.updatePwd(adminId, newPwd, operatorId).then(
        function(doc) {
            successHandler.handle(doc, res);
        },
        function(err) {
            errorHandler.handle(err, req, res);
        }
    );
});

// create admin
router.post("/create", function(req, res, next) {
    var admin = req.body.admin,
        operatorId = req.body.operatorId;
    adminService.create(admin, operatorId).then(
        function(doc) {
            successHandler.handle(doc, res);
        },
        function(err) {
            errorHandler.handle(err, req, res);
        }
    );
});

// delete admin
router.delete("/delete", function(req, res, next) {
    var adminId = req.body.id;
    assert.notEqual(adminId, null);
    adminService.delete(adminId).then(
        function(doc) {
            successHandler.handle(doc, res);
        },
        function(err) {
            errorHandler.handle(err, req, res);
        }
    );
});

// update admin
router.post("/update", function(req, res, next) {
    var adminId = req.body.id,
        newAdmin = req.body.admin,
        operatorId = req.body.operatorId;
    assert.notEqual(adminId, null);
    assert.notEqual(newAdmin, null);

    adminService.update(adminId, newAdmin, operatorId).then(
        function(doc) {
            successHandler.handle(doc, res);
        },
        function(err) {
            errorHandler.handle(err, req, res);
        }
    );
});

// find admin by id
router.get("/searchById", function(req, res, next) {
    var adminId = req.query.id;
    assert.notEqual(adminId, null);
    adminService.searchById(adminId).then(
        function(doc) {
            successHandler.handle(doc, res);
        },
        function(err) {
            errorHandler.handle(err, req, res);
        }
    );
});

// find admin by search condition
router.get("/searchByCondition", function(req, res, next) {
    var condition = req.query;
    assert.notEqual(_.size(condition));
    adminService.searchByCondition(condition).then(
        function (doc) {
            successHandler.handle(doc, res);
        }
    ).catch(function(err) {
            errorHandler.handle(err, req, res);
    });
});

module.exports = router;
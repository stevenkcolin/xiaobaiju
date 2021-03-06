﻿/**
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

    assert.notEqual(name, null, 'name is null');
    assert.notEqual(password, null, 'password is null');

    adminService.login(name, password).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// admin change password
router.post("/updatePwd", function(req, res, next) {
    var adminId = req.body._id;
    var newPwd = req.body.password;
    var operatorId = req.body.operatorId;
    assert.notEqual(newPwd, null, 'password is null');

    adminService.updatePwd(adminId, newPwd, operatorId).then(
        function(doc) {
            successHandler.handle(doc, res);
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
        }
    );
});

// delete admin
router.delete("/delete", function(req, res, next) {
    var adminId = req.body.id;
    assert.notEqual(adminId, null, 'id is null');
    adminService.delete(adminId).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// mass delete admin
router.delete("/massDelete", function(req, res, next) {
    var adminIds = req.body.ids;
    assert.notEqual(adminIds, null, 'ids is null');
    adminService.massDelete(adminIds).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// update admin
router.post("/update", function(req, res, next) {
    var adminId = req.body.id,
        newAdmin = req.body.admin,
        operatorId = req.body.operatorId;
    assert.notEqual(adminId, null, 'id is null');
    assert.notEqual(newAdmin, null, 'admin is null');

    adminService.update(adminId, newAdmin, operatorId).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// find admin by id
router.get("/searchById", function(req, res, next) {
    var adminId = req.query.id;
    assert.notEqual(adminId, null, 'id is null');
    adminService.searchById(adminId).then(
        function(doc) {
            successHandler.handle(doc, res);
        }
    );
});

// find admin by search condition
router.get("/searchByCondition", function(req, res, next) {
    var condition = req.query;
    assert.notEqual(_.size(condition), 'condition is null');
    adminService.searchByCondition(condition).then(
        function (doc) {
            successHandler.handle(doc, res);
        }
    );
});

// find all admin
router.get("/findAll", function(req, res, next) {
    adminService.searchByCondition({}).then(
        function (doc) {
            successHandler.handle(doc, res);
        }
    );
});

module.exports = router;
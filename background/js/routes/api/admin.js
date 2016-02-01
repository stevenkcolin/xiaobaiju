/**
 * Created by Pengfei on 2015/11/24.
 * router for /admin url
 */

var express = require("express");
var _ = require('underscore');

var models = require("../../models/model");
var md5encrypt = require("../../common/md5encrypt");
var successHandler = require("../../common/successHandler");
var Admin = models.ADMIN;
var adminService = require('../../service/adminService');
var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
	req.isRouted = true;
	next();
});

// admin login
router.post("/login", function(req, res, next) {
    adminService.login(req, res, next);
});

// create admin
router.post("/create", function(req, res, next) {
    adminService.create(req, res, next);
});

// delete admin
router.post("/delete", function(req, res, next) {
    adminService.delete(req, res, next);
});

// update admin
router.post("/update", function(req, res, next) {
    adminService.update(req, res, next);
});

// find admin by id
router.get("/searchById", function(req, res, next) {
    adminService.searchById(req, res, next);
});

// find admin by search condition
router.get("/searchByCondition", function(req, res, next) {
    adminService.searchByCondition(req, res, next);
});

module.exports = router;
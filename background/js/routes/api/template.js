/**
 * Created by Pengfei on 2015/11/24.
 * router for /template url
 */


var express = require("express");
var _ = require('underscore');

var constant = require("../../common/constant");
var models = require("../../models/model");
var successHandler = require("../../common/successHandler");
var Template = models.TEMPLATE;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// get all template
router.get("/published", function(req, res, next) {
    Template.find({status: constant.TEMPLATE_STATUS_PUBLISHED}).populate("actionTypeList").exec(function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});





module.exports = router;
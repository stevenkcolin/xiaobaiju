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
    Template.find({status: constant.TEMPLATE_STATUS_PUBLISHED}, {name:1}, function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// get template by id
router.get("/detail", function(req, res, next) {
    var id = req.query.id;
    var limit = req.query.limit;
    Template.findById(id).populate('actionTypeList').exec(function(err, template) {
        if (err) throw err;
        var actionTypeList = template._doc.actionTypeList;
        var PostActions = models.POSTACTIONS;
        var count = 0;
        actionTypeList.map(function(actionTypeDoc, index) {
            var actionType = actionTypeDoc._doc;
            PostActions.find({actionTypeId: actionType._id, isShared: true}, {title: 1}).limit(limit).sort("-lastModifiedDate").exec(function(err, postAction) {
                count++;
                actionType.postActionList = postAction;
                if (count === actionTypeList.length) {
                    successHandler.handle(template, res);
                }
            });
        });
    });
});

// get postActions
router.get("/actionType", function(req, res, next) {
    var id = req.query._id;
    var postActionLimit = req.query.postActionLimit;
    var commentLimit = req.query.commentLimit;

    var postActionParam = {path: "actionTypeList",
        select: {"name": 1}};

    Template.findById(id).populate(postActionParam).exec(function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    })
});

module.exports = router;
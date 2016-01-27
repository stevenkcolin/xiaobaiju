/**
 * Created by linchen on 1/24/16.
 */



var express = require("express");
var _ = require('underscore');

var models = require("../models/sqlModel");
var successHandler = require("../common/successHandler");
var ActionType = models.ActionType;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// create a ActionType
router.post("/create", function(req, res) {
    var reportInfo = req.body;
    var reportModel = req.models.reportInfo;
    reportModel.create(reportInfo, function(err){
        if (err) throw err;
        successHandler.handle(null, res);
    });
});

module.exports = router;
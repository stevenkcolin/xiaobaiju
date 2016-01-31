/**
 * Created by linchen on 1/31/16.
 */
var express = require("express");

var models = require("../models/sqlModel");
var successHandler = require("../common/successHandler");
var LikeEvents = models.LIKEEVENTS;
var transactionHandler = require("../common/transactionHandler");

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

//post 是否喜欢这个PostActions
router.post("/Like", function(req, res) {
    //todo: 在LikeEvents中添加喜欢或者不喜欢
});
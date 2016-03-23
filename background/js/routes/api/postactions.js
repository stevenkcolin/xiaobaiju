/**
 * Created by linchen on 1/31/16.
 */
var express = require("express");
var _ = require('underscore');

var models = require("../../models/model");
var successHandler = require("../../common/successHandler");
var PostActions = models.POSTACTIONS;
var transactionHandler = require("../../common/transactionHandler");

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// get all PostActions
router.get("/", function(req, res, next) {
    PostActions.find(function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// get PostActions by ActionTypeId
router.get("/actiontype/:id", function(req, res) {
    //todo: 根据ActionTypeId 获得所有IsShared=true的PostActions
    //todo: 注意:这里要把已关注用户的PostActions排在较前
});

// get a PostActions by id
router.get("/detail/:id", function(req, res) {
    var id = req.params.id;
    PostActions.findById(id, function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// create a PostActions
router.post("/create", function(req, res) {
    var postactions = new PostActions();
    _.extend(postactions, req.body);
    postactions.save(function(err){
        if (err) throw err;
        successHandler.handle(null, res);
    });
});

// update a PostActions
router.post("/update/:id", function(req, res) {
    var id = req.params.id;
    PostActions.update({_id: id}, {$set: req.body}, function(err, doc) {
        if (err) throw err;
        var result = {count: doc.n};
        successHandler.handle(result, res);
    });
});

// delete a PostActions
router.delete("/:id", function(req, res) {
    var id = req.params.id;
    PostActions.remove({_id: id}, function(err, doc) {
        if (err) throw err;
        var result = {count: doc.result.n};
        successHandler.handle(result, res);
    });
});

// find PostActions by parameter
router.get("/find", function(req, res) {
    //todo: 寻找PostActions by Parameters
});

module.exports = router;
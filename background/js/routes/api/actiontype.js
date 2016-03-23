/**
 * Created by linchen on 1/24/16.
 */



var express = require("express");
var _ = require('underscore');

var models = require("../../models/model");
var successHandler = require("../../common/successHandler");
var ActionType = models.ACTIONTYPE;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// get all ActionType
router.get("/", function(req, res, next) {
    ActionType.find(function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// get a ActionType by id
router.get("/:id", function(req, res) {
    var id = req.params.id;
    ActionType.findById(id, function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// create a ActionType
router.post("/create", function(req, res) {
    var actiontype = new ActionType();
    _.extend(actiontype, req.body);
    //task.createDate = new Date();
    actiontype.save(function(err){
        if (err) throw err;
        successHandler.handle(null, res);
    });
});

// update a ActionType
router.post("/update/:id", function(req, res) {
    var id = req.params.id;
    ActionType.update({_id: id}, {$set: req.body}, function(err, doc) {
        if (err) throw err;
        var result = {count: doc.n};
        successHandler.handle(result, res);
    });

});

// delete a ActionType
router.delete("/:id", function(req, res) {
    var id = req.params.id;
    ActionType.remove({_id: id}, function(err, doc) {
        if (err) throw err;
        var result = {count: doc.result.n};
        successHandler.handle(result, res);
    });
});

// find ActionType by parameter
router.get("/find", function(req, res) {
    //todo: 寻找一个ActionType
    //todo: low priority
});



module.exports = router;
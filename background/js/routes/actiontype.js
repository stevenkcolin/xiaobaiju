/**
 * Created by linchen on 1/24/16.
 */



var express = require("express");
var _ = require('underscore');

var models = require("../models/model");
var successHandler = require("../common/successHandler");
var ActionType = models.ActionType;

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

// create a ActionType
router.post("/create", function(req, res) {
    //todo add code to implement create ActionType
});

// update a ActionType
router.post("/update/:id", function(req, res) {
    var id = req.params.id;
    //todo add code to implement update a ActionType by id
});

// delete a ActionType
router.delete("/:id", function(req, res) {
    var id = req.params.id;
    //todo: add code to implement delete a ActionType by id
});

// find ActionType by parameter
router.get("/find", function(req, res) {
    //todo: find ActionType by parameters
    //todo: low priority
});

// get a ActionType by id
router.get("/:id", function(req, res) {
    var id = req.params.id;
    //todo: find a ActionType by id
});

module.exports = router;
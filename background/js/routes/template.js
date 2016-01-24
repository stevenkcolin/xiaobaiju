/**
 * Created by Pengfei on 2015/11/24.
 * router for /template url
 */


var express = require("express");
var _ = require('underscore');

var models = require("../models/model");
var successHandler = require("../common/successHandler");
var Template = models.Template;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// get all template
router.get("/", function(req, res, next) {
    Template.find(function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// create a template
router.post("/create", function(req, res) {
    //todo add code to implement create template
});

// update a template
router.post("/update/:id", function(req, res) {
    var id = req.params.id;
    //todo add code to implement update a template by id
});

// delete a template
router.delete("/:id", function(req, res) {
    var id = req.params.id;
    //todo: add code to implement delete a template by id
});

// find template by parameter
router.get("/find", function(req, res) {
    //todo: find template by parameters
    //todo: low priority
});

// get a template by id
router.get("/:id", function(req, res) {
    var id = req.params.id;
    //todo: find a template by id
});

module.exports = router;
/**
 * Created by Pengfei on 2015/11/24.
 * router for /task url
 */


var express = require("express");
var _ = require('underscore');

var models = require("../models/model");
var successHandler = require("../common/successHandler");
var Task = models.Task;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// create a task
router.post("/create", function(req, res) {
    var task = new Task();
    _.extend(task, req.body);
    task.createDate = new Date();
    task.save(function(err){
        if (err) throw err;
        successHandler.handle(null, res);
    });
});

//create multiple tasks
router.post("/massCreate", function(req, res) {
    var arrTask = req.body;
    var result = [];
    var count = 0;
    for (var i in arrTask) {
        var task = new Task();
        _.extend(task, arrTask[i]);
        task.createDate = new Date();
        task.save(function (err, doc) {
            if (err) throw err;
            result.push(doc);
            count++;
            if (count === arrTask.length) successHandler.handle(result, res);
        });
    }
});

// update a task
router.post("/update/:id", function(req, res) {
    var id = req.params.id;
    Task.update({_id: id}, {$set: req.body}, function(err, doc) {
        if (err) throw err;
        var result = {count: doc.n};
        successHandler.handle(result, res);
    });
});

// delete a task
router.delete("/:id", function(req, res) {
    var id = req.params.id;
    Task.remove({_id: id}, function(err, doc) {
        if (err) throw err;
        var result = {count: doc.result.n};
        successHandler.handle(result, res);
    });
});

// find task by parameter
router.get("/find", function(req, res) {
    Task.find(req.query, function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// get a task by id
router.get("/:id", function(req, res) {
    var id = req.params.id;
    Task.findById(id, function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

// get all tasks
router.get("/", function(req, res, next) {
    Task.find(function(err, doc) {
        if (err) throw err;
        successHandler.handle(doc, res);
    });
});

module.exports = router;
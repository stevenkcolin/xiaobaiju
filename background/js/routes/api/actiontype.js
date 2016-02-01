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

// create a ActionType
router.post("/create", function(req, res) {
    //todo:新增一个ActionType
    //todo:这个ActionType还带着PostLimit字段
});

// update a ActionType
router.post("/update/:id", function(req, res) {
    var id = req.params.id;
    //todo:修改一个ActionType
    //todo:这个ActionType还带着PostLimit字段
});

// delete a ActionType
router.delete("/:id", function(req, res) {
    var id = req.params.id;
    //todo: 删除一个ActioinType
});

// find ActionType by parameter
router.get("/find", function(req, res) {
    //todo: 寻找一个ActionType
    //todo: low priority
});

// get a ActionType by id
router.get("/:id", function(req, res) {
    var id = req.params.id;
    //todo: 根据Id找一个ActionType
});

module.exports = router;
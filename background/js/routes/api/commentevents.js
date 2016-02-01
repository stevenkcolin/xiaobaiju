/**
 * Created by linchen on 1/31/16.
 */
var express = require("express");

var models = require("../../models/sqlModel");
var successHandler = require("../../common/successHandler");
var CommentEvents = models.COMMENTEVENTS;
var transactionHandler = require("../../common/transactionHandler");

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// create a CommentEvents
router.post("/create", function(req, res) {
    //todo: 添加一个CommentEvents,添加的时候需要考虑ActionType的PostLimit限制
});

//todo: 对PostActions的comments和 对comments的comments是否要用不同接口?请飞哥考虑

// update a CommentEvents
router.post("/update/:id", function(req, res) {
    //todo: 更新一个CommentEvents
});

// delete a CommentEvents
router.delete("/:id", function(req, res) {
    //todo: 删除一个CommentEvents
});

// find CommentEvents by parameter
router.get("/find", function(req, res) {
    //todo: 寻找CommentEvents by Parameters
});

// get a CommentEvents by id
router.get("/:id", function(req, res) {
    //todo: 获得一个CommentEvents by id
});
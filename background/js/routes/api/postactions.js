/**
 * Created by linchen on 1/31/16.
 */
var express = require("express");

var models = require("../../models/sqlModel");
var successHandler = require("../../common/successHandler");
var PostActions = models.POSTACTIONS;
var transactionHandler = require("../../common/transactionHandler");

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// create a PostActions
router.post("/create", function(req, res) {
    //todo: 添加一个PostActions,添加的时候需要考虑ActionType的PostLimit限制
});

// update a PostActions
router.post("/update/:id", function(req, res) {
    //todo: 更新一个PostActions
});

// delete a PostActions
router.delete("/:id", function(req, res) {
    //todo: 删除一个PostActions
});

// find PostActions by parameter
router.get("/find", function(req, res) {
    //todo: 寻找PostActions by Parameters
});

// get a PostActions by id
router.get("/:id", function(req, res) {
    //todo: 获得一个PostAction by id
});

// get PostActions by ActionTypeId
router.get("/ActionType/:id", function(req, res) {
    //todo: 根据ActionTypeId 获得所有IsShared=true的PostActions
    //todo: 注意:这里要把已关注用户的PostActions排在较前
});

// get all PostActions
router.get("/", function(req, res, next) {
    //todo: 获得所有PostActions
});

module.exports = router;
/**
 * Created by Pengfei on 2015/11/24.
 * router for /template url
 */


var express = require("express");
var _ = require('underscore');

var models = require("../../models/model");
var successHandler = require("../../common/successHandler");
var Template = models.TEMPLATE;

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// get all template
router.get("/", function(req, res, next) {
    //todo: 获得所有的templates,并带着每个template下的ActionTypeId
    //todo: 获得的templates应该是status=isPublished, 且type=官方发布的,为后续的私人template做准备.
});

// get a template by id
router.get("/:id", function(req, res) {
    var id = req.params.id;
    //todo: 根据Id获得一个template
    //todo: 这个template还带着他所拥有的ActionType
});

// create a template
router.post("/create", function(req, res) {
    //todo: 新增一个Template
    //todo: 这个template将带着ActionTypeId一起被create
});

// update a template
router.post("/update/:id", function(req, res) {
    var id = req.params.id;
    //todo: 更新一个template
    //todo: 这个template将带着ActionTypeId
});

// delete a template
router.delete("/:id", function(req, res) {
    var id = req.params.id;
    //todo: 删除一个template
});

// find template by parameter
router.get("/find", function(req, res) {
    //todo: 找到一个template
    //todo: low priority
});





module.exports = router;
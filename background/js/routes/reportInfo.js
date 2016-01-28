/**
 * Created by Pengfei on 1/24/16.
 */
var express = require("express");

var models = require("../models/sqlModel");
var successHandler = require("../common/successHandler");
var ActionType = models.ActionType;
var transactionHandler = require("../common/transactionHandler");

var router = express.Router();

// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// create a ReportInfo
router.post("/create", function(req, res) {
    var reportInfo = req.body;
    var reportModel = req.models.reportInfo;
    reportModel.create(reportInfo, function(err){
        if (err) throw err;
        successHandler.handle(null, res);
    });
});

// create multiple ReportInfo
router.post("/massCreate", [transactionHandler.begin,
        function(req, res, next) {
            var reportInfoList = req.body;
            if (reportInfoList.length === 0) next();
            var reportModel = req.models.reportInfo;
            var count = 0;
            for (var i in reportInfoList) {
                reportInfoList[i].actionTime = new Date(reportInfoList[i].actionTime);
                reportModel.create(reportInfoList[i], function (err) {
                    if (err) req.models.error = err;
                    count++;
                    if (count === reportInfoList.length) next();
                });
            }
        }, transactionHandler.finalize,
    function(req, res) {
        successHandler.handle(null, res)
    }]);

module.exports = router;
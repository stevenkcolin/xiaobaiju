/**
 * Created by Pengfei on 2016/3/7.
 * router for /attachment url
 */

var express = require("express");
var path = require("path");

var router = express.Router();


// set a flag
router.all("*", function(req, res, next) {
    req.isRouted = true;
    next();
});

// admin login
router.get("/download", function(req, res, next) {
    var filepath = req.query.filepath;
    //var filename = req.query.filename;
    console.log(path.join(process.cwd(), filepath));
    res.download(path.join(process.cwd(), filepath));
});

module.exports = router;
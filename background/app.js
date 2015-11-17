var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var favicon = require("static-favicon");

var errorHandler = require("./js/common/errorHandler");
var constant = require("./js/common/constant");
var user = require("./js/routes/user");
require("./js/common/dbUtils");

var app = express();

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use domain middleware
app.use(require("express-domain-middleware"));

// user routers for "/user" url
app.use("/user", user);

//send response if success
app.use(function(req, res) {
    var result = {status: constant.RETURN_TYPE_SUCCESS, result: req.result};
    res.status(constant.RESPONSE_STATUS_SUCCESS).json(result);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = constant.RESPONSE_STATUS_NOT_FOUND;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    errorHandler.handle(err, req, res, next)
});

module.exports = app;

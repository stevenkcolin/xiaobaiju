var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var favicon = require("static-favicon");
var orm = require("orm");

var errorHandler = require("./js/common/errorHandler");
var constant = require("./js/common/constant");
var adminIndex = require('./js/routes/admin/index');
var admin = require("./js/routes/api/admin");
var user = require("./js/routes/api/user");
var task = require("./js/routes/api/task");
var template = require("./js/routes/api/template");
var attachment = require("./js/routes/api/attachment");
var actionType = require("./js/routes/api/actionType");
var reportInfo = require("./js/routes/api/reportInfo");
var postActions = require("./js/routes/api/postActions");
var sqldbConfig = require("./js/config/sqlDB.json");
var session = require('express-session');
require("./js/common/dbUtils");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: '12345',
    name: 'testapp',   //�����nameֵ����cookie��name��Ĭ��cookie��name�ǣ�connect.sid
    cookie: {maxAge: 1200000},  //����maxAge��80000ms����80s��session����Ӧ��cookieʧЧ����
    resave: false,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use domain middleware
app.use(require("express-domain-middleware"));

//db connection by using orm
app.use(orm.express(sqldbConfig, {
    define: function(db, models, next) {
        var listModels = require("./js/models/sqlModel");
        listModels(db, models);
        console.log('Mysql connected to ' + sqldbConfig.protocol + "://" + sqldbConfig.host + "/" + sqldbConfig.database);
        next();
    }
}));

// Backend admin page
app.use("/admin", adminIndex);

// user routers for "/admin" url
app.use("/api/admin", admin);

// user routers for "/user" url
app.use("/api/user", user);

// task routers for "/task" url
app.use("/api/task", task);

// template routers for "/template" url
app.use("/api/template",template);

// template routers for "/actiontype" url
app.use("/api/actiontype",actionType);

// attachment routers for "/attachment" url
app.use("/api/attachment", attachment);

// template routers for "/reportInfo" url
app.use("/api/reportInfo", reportInfo);

// postactions routers for "/postactions" url
app.use("/api/postactions", postActions);

//send response if success
app.use(function(req, res) {
    if (!req.isRouted) {
        res.status(constant.RESPONSE_STATUS_NOT_FOUND).json({status: constant.RETURN_TYPE_ERROR});
    }
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

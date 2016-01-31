var express = require("express");
var path = require("path");
var logger = require("morgan");
var session = require('express-session');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var favicon = require("static-favicon");
var orm = require("orm");

var errorHandler = require("./js/common/errorHandler");
var constant = require("./js/common/constant");
var index = require('./js/routes/index');
var admin = require("./js/routes/admin");
var user = require("./js/routes/user");
var task = require("./js/routes/task");
var template = require("./js/routes/template");
var actiontype = require("./js/routes/actiontype");
var reportInfo = require("./js/routes/reportInfo");
var sqldbConfig = require("./js/config/sqlDB.json");
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
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use domain middleware
app.use(require("express-domain-middleware"));

//db connection by using orm
//app.use(orm.express(sqldbConfig, {
//    define: function(db, models, next) {
//        var listModels = require("./js/models/sqlModel");
//        listModels(db, models);
//        next();
//    }
//}));

// 登录拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.user) {
        if (url === "/admin/login") {
            next()
        }
        else {
            return res.redirect("/login");
        }
    }
    next();
});

// user routers for "/" url
app.use("/", index);

// user routers for "/admin" url
app.use("/admin", admin);

// user routers for "/user" url
app.use("/user", user);

// task routers for "/task" url
app.use("/task", task);

// template routers for "/template" url
app.use("/template", template);

// template routers for "/actiontype" url
app.use("/actiontype", actiontype);

// template routers for "/reportInfo" url
app.use("/reportInfo", reportInfo);


//send response if success
app.use(function (req, res) {
    if (!req.isRouted) {
        res.status(constant.RESPONSE_STATUS_NOT_FOUND).json({status: constant.RETURN_TYPE_ERROR});
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = constant.RESPONSE_STATUS_NOT_FOUND;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    errorHandler.handle(err, req, res, next)
});

module.exports = app;

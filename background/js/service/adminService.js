/**
 * Created by ncs1207 on 2016/2/1.
 */
var models = require("../models/model");
var md5encrypt = require("../common/md5encrypt");
var successHandler = require("../common/successHandler");
var Admin = models.ADMIN;
var _ = require('underscore');

module.exports = {
    login: function(req, res, next) {
        var userid = req.body.userid;
        var userpwd = req.body.userpwd;
        //var encoded = req.body.encoded;
        //if (encoded !== true) {
        //    password = md5encrypt.encrypt(password);
        //}
        Admin.find({loginAccount: userid, password: userpwd}, function(err, doc) {
            if (err) throw err;
            if (doc.length > 0) {
                req.session.user = doc;
                successHandler.handle(doc, res);
            } else if (doc.length === 0) {
                res.json({"status": "fail"})
            }

        });
    },
    create: function(req, res, next) {
        var admin = new Admin();
        //if (req.body.password) req.body.password = md5encrypt.encrypt(req.body.password);
        _.extend(admin, req.body);
        admin.createDate = new Date();
        admin.save(function(err, doc){
            if (err) throw err;
            successHandler.handle(doc, res);
        });
    },

    delete: function(req, res, next) {
        var adminIdsArray = req.body.adminIds.split(",");

        Admin.remove({"_id" : {"$in" : adminIdsArray } },function(err, doc) {
            if (err) throw err;
            successHandler.handle(doc, res);
        })
    },

    update: function(req, res, next) {
        var adminId = req.body.adminId;
        var param = req.body;
        Admin.update({"_id" : adminId}, {$set:param},function(err, doc) {
            if (err) throw err;
            successHandler.handle(doc, res);
        })
    },

    searchById: function (req, res, next) {
        var adminId = req.query.adminId;
        var searchCondition = {"_id": adminId};

        Admin.find(searchCondition,function(err,doc){
            if (err) throw err;
            successHandler.handle(doc, res);
        });
    },
    searchByCondition: function (req, res, next) {
        //if (req.query.name === undefined) {
        //    successHandler.handle(null, res);
        //    return;
        //}

        var name = req.query.name;
        var loginAccount = req.query.loginAccount;
        var searchCondition = {"name": new RegExp(name, 'i'), "loginAccount": loginAccount};
        if (name === '') {
            delete searchCondition.name;
        }
        if (loginAccount === '') {
            delete searchCondition.loginAccount;
        }

        var page = req.query.page;
        var rows = req.query.rows;
        var startLine = (page - 1) * rows;
        var dbSearch = Admin.find(searchCondition).limit(+rows).skip(startLine);

        dbSearch.exec(function (err, rs) {
            if (err) {
                throw err;
            } else {
                //计算数据总数
                Admin.find(searchCondition, function (err, result) {
                    res.json({rows: rs, total: result.length});
                });

            }
        });
    }
}
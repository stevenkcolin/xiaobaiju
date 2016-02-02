/**
 * Created by ncs1207 on 2016/2/1.
 */
var models = require("../models/model");
var md5encrypt = require("../common/md5encrypt");
var successHandler = require("../common/successHandler");
var User = models.USER;
var _ = require('underscore');


module.exports = {
    create: function(req, res, next) {
        var user = new User();
        if (req.body.password) req.body.password = md5encrypt.encrypt(req.body.password);
        _.extend(user, req.body);
        user.createDate = new Date();
        user.save(function(err, doc){
            if (err) throw err;
            successHandler.handle(doc, res);
        });
    },

    delete: function(req, res, next) {
        var userIdsArray = req.body.userIds.split(",");

        User.remove({"_id" : {"$in" : userIdsArray } },function(err, doc) {
            if (err) throw err;
            successHandler.handle(doc, res);
        })
    },

    update: function(req, res, next) {
        var userId = req.body.userId;
        var param = req.body;
        var password = md5encrypt.encrypt(req.body.password);
        User.update({"_id" : userId}, {$set:param},function(err, doc) {
            if (err) throw err;
            successHandler.handle(doc, res);
        })
    },

    searchById: function(req, res, next) {
        var userId = req.query.userId;
        var searchCondition = {"_id": userId};

        User.find(searchCondition,function(err,doc){
            if (err) throw err;
            successHandler.handle(doc, res);
        });
    },

    searchByCondition: function(req, res, next) {
        //if (req.query.name === undefined) {
        //    successHandler.handle(null, res);
        //    return;
        //}
        var name = req.query.name;
        var loginFrom = req.query.loginFrom;
        var searchCondition = {"name": new RegExp(name, 'i'),"loginFrom": loginFrom};
        if (name === '') {
            delete searchCondition.name;
        }
        if (loginFrom === '') {
            delete searchCondition.loginFrom;
        }

        var page=req.query.page;
        var rows=req.query.rows;
        var startLine = (page-1)*rows;
        var dbSearch = User.find(searchCondition).limit(+rows).skip(startLine);

        dbSearch.exec(function(err,rs){
            if(err){
                throw err;
            }else{
                //计算数据总数
                User.find(searchCondition, function(err,result){
                    res.json({rows:rs,total:result.length});
                });

            }
        });
    }
}

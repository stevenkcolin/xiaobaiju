/**
 * Created by ncs1207 on 2016/2/1.
 */
var models = require('../models/model'),
    md5encrypt = require('../common/md5encrypt'),
    successHandler = require('../common/successHandler'),
    User = models.User,
    _ = require('underscore'),
    Q = require('q'),
    baseDao = require('../dao/baseDao');

module.exports = {
    create: function(user, operatorId) {
        if (user.password) user.password = md5encrypt.encrypt(user.password);
        var userPo = new User();
        _.extend(userPo, user);
        return baseDao.save(userPo, operatorId);
    },

    delete: function(userIds) {
        return baseDao.massDeleteById(userIds, User)
        var userIdsArray = req.body.userIds.split(",");

        User.remove({"_id" : {"$in" : userIdsArray } },function(err, doc) {
            if (err) throw err;
            successHandler.handle(doc, res);
        })
    },

    getAll: function(start, rows) {
        var result = {};
        return baseDao.findWithPage({}, null, null, start, rows, User).
            then(function(users){
                result.users = users;
                return null
            }).
            then(function() {
                return baseDao.count({}, User);
            }).
            then(function(count) {
                result.total = count;
                return result;
            });
        //return result;
    },

    update: function(userId, user, operatorId) {
        if (user.password) user.password = md5encrypt.encrypt(user.password);
        return baseDao.updateById(userId, user, null, User, operatorId);
    },

    searchById: function(userId) {
        return baseDao.findById(userId, null, null, User);
    },

    searchByCondition: function(condition, start, rows) {
        if (condition.nickName) condition.nickName = new RegExp(condition.nickName, 'i');

        return Q.spread([
                baseDao.findWithPage(condition, null, null, start, rows, User),
                baseDao.count({}, User)],
            function (users, count) {
                return {users: users, total:count};
            }
        );
    },

    searchOneByCondition: function(condition) {
        return baseDao.find(condition, null, null, User)
    }
}

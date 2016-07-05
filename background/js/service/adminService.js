/**
 * Created by ncs1207 on 2016/2/1.
 */

var _ = require('underscore'),
    models = require('../models/model'),
    md5encrypt = require('../common/md5encrypt'),
    Admin = models.Admin,
    baseDao = require('../dao/baseDao'),
    userService = require('./userService');

module.exports = {
    login: function(name, password) {
        var encryptedPwd = md5encrypt.encrypt(password),
            searchCond = {name: new RegExp('^'+name+'$', 'i'), password: encryptedPwd};

        return baseDao.find(searchCond, '-password', null, Admin);
    },

    updatePwd: function(adminId, newPwd, operatorId) {
        var newPwd = md5encrypt.encrypt(newPwd),
            param = {'password,': newPwd};

        return baseDao.updateById(adminId, param, null, Admin, operatorId);
    },

    create: function(admin, operatorId) {
        var userId;
        return userService.create({isAdmin:true}, operatorId).then(
            function(user) {
                admin.password = md5encrypt.encrypt(admin.password);
                var adminPo = new Admin();
                _.extend(adminPo, admin);
                adminPo.userId = user._id;
                return baseDao.save(adminPo, operatorId);
            }
        );
    },

    delete: function(adminId, operatorId) {
        return baseDao.removeById(adminId, null, Admin).then(
            function(admin) {
                userService.update(admin.userId, {isAdmin: false}, operatorId);
            }
        );
    },

    update: function(adminId, newAdmin, operatorId) {
        if (newAdmin.password) newAdmin.password = md5encrypt.encrypt(newAdmin.password);
        return baseDao.updateById(adminId, newAdmin, null, Admin, operatorId);
    },

    searchById: function (adminId) {
        return baseDao.findById(adminId, '-password', null, Admin);
    },

    searchByCondition: function (condition) {
        var searchCond = {}, start = condition.start, rows = condition.rows;
        if (condition.name) {
            searchCond.name = new RegExp(condition.name, 'i');
        }
        if (condition.realName) {
            searchCond.realName = new RegExp(condition.realName, 'i');
        }
        return baseDao.findWithPage(searchCond, '-password', null, start, rows, Admin);
    },

    massDelete: function(adminIds) {
        return baseDao.massDeleteById(adminIds, Admin);
    }
}
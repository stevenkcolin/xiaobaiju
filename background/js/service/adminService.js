/**
 * Created by ncs1207 on 2016/2/1.
 */

var _ = require('underscore');

var models = require("../models/model");
var md5encrypt = require("../common/md5encrypt");
var Admin = models.Admin;
var baseDao = require("../dao/baseDao");

module.exports = {
    login: function(name, password) {
        var encryptedPwd = md5encrypt.encrypt(password),
            searchCond = {name: new RegExp('^'+name+'$', 'i'), password: encryptedPwd};

        return baseDao.find(searchCond, '-password', null, Admin);
    },

    updatePwd: function(adminId, newPwd, operatorId) {
        var newPwd = md5encrypt.encrypt(newPwd),
            param = {"password": newPwd};

        return baseDao.updateById(adminId, param, null, Admin, operatorId);
    },

    create: function(admin, operatorId) {
        admin.password = md5encrypt.encrypt(admin.password);
        var admonPo = new Admin();
        _.extend(admonPo, admin);
        return baseDao.save(admonPo, operatorId);
    },

    delete: function(adminId) {
        return baseDao.removeById(adminId, null, Admin);
    },

    update: function(adminId, newAdmin, operatorId) {
        newAdmin.password = md5encrypt.encrypt(newAdmin.password);
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
    }
}
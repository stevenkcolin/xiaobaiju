/**
 * Created by hepf3 on 6/5/2016.
 */
var constants = require('../constants');
var Q = require('q');

module.exports = {
    login: function(username, password) {
        var data = {name: username, password: password},
            deferred = Q.defer();
        $.ajax({
            url: '/api/admin/login',
            data: data,
            dataType: 'json',
            type: 'POST',
            success: function(response) {
                if (response.status = constants.API_STATUS_SUCCESS && response.result.length) {
                    response.loginTime = new Date().getTime();
                    localStorage.setItem(constants.SESSION_KEY, JSON.stringify(response.result[0]));
                    deferred.resolve(response);
                } else {
                    deferred.reject(response);
                }
            },
            error: function(error) {
                console.error(error);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    },

    checkIsLogin: function() {
        var loginUserJson = localStorage.getItem(constants.SESSION_KEY);
        if (!loginUserJson) return false;
        var loginUser = loginUser = JSON.parse(loginUserJson),
            currentTime = new Date().getTime();
        if (currentTime - loginUser.loginTime > constants.SESSION_TIMEOUT) {
            return false;
        }
        return true;
    },

    logout: function() {
        localStorage.removeItem(constants.SESSION_KEY);
    },

    changePassword: function(userId, password) {
        var admin = JSON.parse(localStorage.getItem(constants.SESSION_KEY)),
            operatorId = admin._id,
            data = {id: userId, admin:{password:password}, operatorId:operatorId},
            deferred = Q.defer();
        $.ajax({
            url: '/api/admin/update',
            data: JSON.stringify(data),
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            success: function(response) {
                if (response.status = constants.API_STATUS_SUCCESS) {
                    deferred.resolve(response);
                } else {
                    deferred.reject(response);
                }
            },
            error: function(error) {
                console.error(error);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    },

    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem(constants.SESSION_KEY));
    }
};
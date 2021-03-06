/**
 * Created by hepf3 on 6/5/2016.
 */
var constants = require('../constants');

module.exports = {
    login: function (username, password) {
        var data = {name: username, password: password};
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/login',
                data: data,
                dataType: 'json',
                type: 'POST',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS && response.result.length) {
                        response.loginTime = new Date().getTime();
                        localStorage.setItem(constants.SESSION_KEY, JSON.stringify(response.result[0]));
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    console.error(error);
                    reject(error);
                }
            });
        });
    },

    checkIsLogin: function () {
        var loginUserJson = localStorage.getItem(constants.SESSION_KEY);
        if (!loginUserJson) return false;
        var loginUser = loginUser = JSON.parse(loginUserJson),
            currentTime = new Date().getTime();
        if (currentTime - loginUser.loginTime > constants.SESSION_TIMEOUT) {
            return false;
        }
        this.freshLogin(loginUser);
        return true;
    },

    freshLogin: function(loginUser) {
        loginUser.loginTime = new Date().getTime();
        localStorage.setItem(constants.SESSION_KEY, JSON.stringify(loginUser));
    },

    logout: function () {
        localStorage.removeItem(constants.SESSION_KEY);
    },

    changePassword: function (userId, password) {
        var admin = JSON.parse(localStorage.getItem(constants.SESSION_KEY)),
            operatorId = admin.userId,
            data = {id: userId, admin: {password: password}, operatorId: operatorId};
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/update',
                data: JSON.stringify(data),
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    console.error(error);
                    reject(error);
                }
            });
        });
    },

    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem(constants.SESSION_KEY));
    },

    getAdminList: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/findAll',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },

    getAdminById: function (id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/searchById?id=' + id,
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },


    updateAdmin: function (admin) {
        var data = {
                id: admin._id,
                admin: {
                    name: admin.name,
                    realName: admin.realName
                },
                operatorId: this.getCurrentUser().userId
            };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/update',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },


    createAdmin: function (admin) {
        var data = {
                admin: admin,
                operatorId: this.getCurrentUser().userId
            };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/create',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },

    deleteAdmin: function (id) {
        var data = {
                id: id
            };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/delete',
                dataType: 'json',
                type: 'DELETE',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },

    massDelete: function(ids) {
        var data = {ids: ids}
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/admin/massDelete',
                dataType: 'json',
                type: 'DELETE',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    if (response.status = constants.API_STATUS_SUCCESS) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
};
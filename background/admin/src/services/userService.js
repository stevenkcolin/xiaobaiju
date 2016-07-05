/**
 * Created by hepf3 on 6/26/2016.
 */
var constants = require('../constants'),
    _ = require('underscore');

module.exports = {

    searchUser: function (start,user) {
        if (!start) start = 0;
        var rows = constants.ROWS;
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/user',
                dataType: 'json',
                type: 'GET',
                data: _.extend(user, {start: start, rows: rows}),
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
        //return deferred.promise;
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
        })
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
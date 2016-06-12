/**
 * Created by hepf3 on 5/29/2016.
 */

var Q = require("q");

module.exports = {
    save: function(entity, userId) {
        var curTime = new Date();
        entity.createdDate = curTime;
        entity.lastModifiedDate = curTime;
        entity.createdBy = userId;
        entity.lastModifiedBy = userId;

        var deferred = Q.defer();
        entity.save(function(err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve(doc);
        });
        return deferred.promise;
    },

    updateById: function(id, update, options, schema, userId) {
        var curTime = new Date();
        update.lastModifiedDate = curTime;
        update.lastModifiedBy = userId;

        var deferred = Q.defer();
        schema.findByIdAndUpdate(id, update, options, function (err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve(doc);
        });
        return deferred.promise;
    },

    removeById: function(id, options, schema) {
        var deferred = Q.defer();
        schema.findByIdAndRemove(id, options, function(err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve(doc);
        });
        return deferred.promise;
    },

    findById: function(id, projection, options, schema) {
        var deferred = Q.defer();
        schema.findById(id, projection, options, function(err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve(doc);
        });
        return deferred.promise;
    },

    find: function(conditions, projection, options, schema) {
        var deferred = Q.defer();
        schema.find(conditions, projection, options, function(err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve(doc);
        });
        return deferred.promise;
    },

    findWithPage: function(conditions, projection, options, start, rows, schema) {
        var deferred = Q.defer();
        var dbsearch = schema.find(conditions, projection, options).skip(Number(start)).limit(Number(rows));
        dbsearch.exec(function(err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

};
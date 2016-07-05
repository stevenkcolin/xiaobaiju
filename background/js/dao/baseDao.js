/**
 * Created by hepf3 on 5/29/2016.
 */

var _ = require('underscore')

module.exports = {
    save: function(entity, userId) {
        var curTime = new Date();
        entity.createdDate = curTime;
        entity.lastModifiedDate = curTime;
        entity.createdBy = userId;
        entity.lastModifiedBy = userId;

        return new Promise(function(resolve){
            entity.save(function(err, doc) {
                resolve(doc);
            });
        });
    },

    updateById: function(id, update, options, schema, userId) {
        var curTime = new Date();
        update.lastModifiedDate = curTime;
        update.lastModifiedBy = userId;
        if (!options) options = {};
        _.extend(options, {new: true});

        return new Promise(function(resolve){
            schema.findByIdAndUpdate(id, update, options, function (err, doc) {
                resolve(doc);
            });
        });
    },

    removeById: function(id, options, schema) {
        return new Promise(function(resolve){
            schema.findByIdAndRemove(id, options, function(err, doc) {
                resolve(doc);
            });
        });
    },

    findById: function(id, projection, options, schema) {
        return new Promise(function(resolve){
            schema.findById(id, projection, options, function(err, doc) {
                resolve(doc);
            })
        });
    },

    find: function(conditions, projection, options, schema) {
        return new Promise(function(resolve){
            schema.find(conditions, projection, options, function(err, doc) {
                resolve(doc);
            });
        });
    },

    findWithPage: function(conditions, projection, options, start, rows, schema) {
        var dbsearch = schema.find(conditions, projection, options).skip(Number(start)).limit(Number(rows));
        return new Promise(function(resolve){
            dbsearch.exec(function(err, doc) {
                resolve(doc);
            });
        });
    },

    massDeleteById: function(ids, schema) {
        var condition = {_id:{$in:ids}};
        return new Promise(function(resolve){
            schema.remove(condition, function(err, doc) {
                resolve(doc);
            });
        });
    },

    count: function(conditions, schema) {
        return new Promise(function(resolve){
            schema.count(conditions, function(err, doc) {
                resolve(doc);
            });
        });
    }

};
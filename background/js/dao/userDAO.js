/**
 * Created by Pengfei on 2015/11/9.
 */

var _ = require('underscore');

var userDao = function() {
    return {
        create: function(models, user, func) {
            var userModel = models.user;
            userModel.create(user, function(err){
                func(err)
            });
        },

        save: function(models, user, func) {
            var userModel = models.user;
            userModel.get(user.id, function(err, origUser){
                if (err) {
                    func(err);
                    return;
                }
                _.extend(origUser, user);
                origUser.save(function(err) {
                    func(err);
                });
            });
        },

        getById: function(models, id, func) {
            var user = models.user;
            user.get(id, function(err, user) {
                func(err, user);
            });
        },

        list: function(models, func) {
            var user = models.user;
            user.find({}, function(err, user){
                func(err, user);
            });
        },

        remove: function(models, id, func) {
            var userModel = models.user;
            userModel.get(id, function(err, origUser){
                if (err) {
                    func(err);
                    return;
                }
                origUser.remove(function(err) {
                    func(err);
                });
            });
        },

        addBook: function(models, userId, book, func) {
            var userModel = models.user;
            models.user.get(userId, function(err, user) {
                if (err) {
                    func(err);
                    return;
                }
                models.book.one({name:book.name}, function(err, book){
                    if (err) {
                        func(err);
                        return;
                    }
                    user.addBooks(book, function(err) {
                        func(err);
                    })
                });
            })
        }
    };
};

module.exports = userDao();
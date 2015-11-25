/**
 * Created by Pengfei on 2015/11/9.
 * Transaction handler for db query.
 * begin(): begin an transaction
 * finalize(): commit or rollback a transaction and write the response if no error
 */
var transaction = require('orm-transaction');

var logger = require('../common/logger');

var logFile = logger.getLogger('log_file');

module.exports = function transHandler() {
    return {
        begin: function(req, res, next) {
            if (req && req.models) {
                req.error = undefined;
                req.models.db.use(transaction);
                req.models.db.transaction(function(err, txn) {
                    req.txn = txn;
                    next();
                });
            }
            else {
                next();
            }
        },

        finalize: function(req, res, next) {
            if (req && req.models) {
                if (req.models.error) {
                    logFile.warn("rollback the transaction with error: " + req.models.error);
                    req.txn.rollback(function(err) {
                        if (err) throw err;
                        next(req.models.error);
                    });
                } else {
                    req.txn.commit(function (err) {
                        if (err) throw err;
                    });
                    next();
                }
            } else {
                next();
            }
        }
    }
}();
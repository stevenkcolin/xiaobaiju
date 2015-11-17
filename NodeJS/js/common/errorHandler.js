/**
 * Created by Pengfei on 2015/11/9.
 * Error handler.
 * It will writer an 200 to response and write error level to log
 */

var logger = require('./logger');
var constant = require('./constant');

var errorHandler = function(){
	var handle = function(err, req, res, next) {
		//console.error(err.stack);
		res.format({
			'application/json': function() {
				var logFile = logger.getLogger('log_file');
				logFile.error(err.stack);
				res.status(err.status || constant.RESPONSE_STATUS_ERROR);
				res.json({status: constant.RETURN_TYPE_ERROR, message: err.message, error: err.stack});
			}
		});
	};
	
	return {handle: handle}
};

module.exports = errorHandler();
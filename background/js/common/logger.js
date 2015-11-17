/**
 * Created by Pengfei on 2015/11/9.
 * Logger util by wrapping log4js
 * The config is ../config/log4j.json
 * How to use:
 * var logger = require('./logger');
 * var logFile = logger.getLogger('log_file');
 * logFile.error(err.stack);
 */

var logger = require('log4js');
var logger_config = require('../config/log4j.json');
logger.configure(logger_config);

module.exports = logger;
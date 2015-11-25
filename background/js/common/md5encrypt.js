/**
 * Created by Pengfei on 2015/11/17.
 */
var crypto = require('crypto');

module.exports = function() {
    return {
        encrypt: function (content) {
            var md5 = crypto.createHash('md5');
            md5.update(content);
            return md5.digest('hex');
        }
    }
}();
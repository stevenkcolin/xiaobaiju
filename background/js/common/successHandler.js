/**
 * Created by Pengfei on 2015/11/24.
 */
/**
 * Created by Pengfei on 2015/11/9.
 * Success handler.
 * It will writer an 200 to response
 */

var constant = require('./constant');

var successHandler = function(){
    var handle = function(result, response) {
        var resJson = {status: constant.RETURN_TYPE_SUCCESS};
        if (result) resJson.result = result;
        response.status(constant.RESPONSE_STATUS_SUCCESS).json(resJson);
    };

    return {handle: handle}
};

module.exports = successHandler();
/**
 * Created by Pengfei on 2015/11/9.
 * Constant definition
 */

var constant = function () {
	return {
		RETURN_TYPE_ERROR: "error",
		RETURN_TYPE_SUCCESS: "success",
		RESPONSE_STATUS_SUCCESS: 200,
		RESPONSE_STATUS_ERROR: 500,
		RESPONSE_STATUS_NOT_FOUND: 404,

		TEMPLATE_STATUS_DRAFT: 0,
		TEMPLATE_STATUS_PUBLISHED: 1,
		TEMPLATE_STATUS_RETIRED: 2
	};
};

module.exports = constant();
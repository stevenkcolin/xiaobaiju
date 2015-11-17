/**
 * Created by Pengfei on 2015/11/9.
 * User model mapping to USER table
 */


var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// Define User schema
var _User = new Schema({
    phone : String,
    password : String
});
// export them
exports.User = mongoose.model("User", _User, "USER");
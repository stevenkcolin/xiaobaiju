/**
 * Created by Pengfei on 2015/11/9.
 * User model mapping to USER table
 */


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Define User schema
var _User = new Schema({
    phone : {type: String, unique: true, sparse: true},
    password : String,
    loginFrom: String, //3rd party {qq, weibo, weixin}
    loginAccount: String, //3rd party account
    name: String,
    createDate: Date
});

_User.index({loginFrom: 1, loginAccount: 1}, {unique: true});

// Define Task schema
var _Task = new Schema({
    title : String,
    description : String,
    dueDate: Date,
    createDate: Date,
    completed: Boolean,
    user: {type: Schema.Types.ObjectId, ref: "User"}
});

// export them
exports.User = mongoose.model("User", _User, "USER");
exports.Task = mongoose.model("Task", _Task, "TASK");
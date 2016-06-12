/**
 * Created by Pengfei on 2015/11/9.
 * User model mapping to USER table
 */


var mongoose = require("mongoose");
var _ = require("underscore");

var Schema = mongoose.Schema;

var baseClass = {
    createdDate : Date,
    lastModifiedDate : Date
};

var userBaseClass = _.extend({
    createdBy : {type: Schema.Types.ObjectId, ref: "USER"},
    lastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"}
}, baseClass);

var adminBaseClass = _.extend({
    createdBy : {type: Schema.Types.ObjectId, ref: "ADMIN"},
    lastModifiedBy : {type: Schema.Types.ObjectId, ref: "ADMIN"}
}, baseClass);

// Define User schema
var _USER = new Schema({
    phone : {type: String, unique: true, sparse: true},
    password : String,
    loginFrom: String, //3rd party {qq, weibo, weixin}
    loginAccount: String, //3rd party account
    name: String,
    createDate: Date
});

_USER.index({loginFrom: 1, loginAccount: 1}, {unique: true});

// Define Admin schema
var _ADMIN = new Schema(_.extend({
    name: {type: String, unique: true},
    password : String,
    realName: String
}, adminBaseClass));


// Define Task schema
var _TASK = new Schema(_.extend({
    title : String,
    description : String,
    dueDate: Date,
    completed: Boolean,
    user: {type: Schema.Types.ObjectId, ref: "USER"}
}, userBaseClass));

// added by chenlin on 2016

var _TEMPLATE = new Schema(_.extend({
    name : String,
    actionTypeList : [{type: Schema.Types.ObjectId, ref: "ACTIONTYPE"}],
    status : Number, //0:draft, 1:published, 2:retired
    type : String,
    background : String
}, adminBaseClass));


var _ACTIONTYPE = new Schema(_.extend({
    name : String,
    postLimit : String
}, adminBaseClass));


var _LIKESCHEMA = new Schema ({
    createdBy : {type: Schema.Types.ObjectId, ref: "USER"},
    createdDate : Date
});


var _POSTACTIONS = new Schema(_.extend({
    actionTypeId: {type: Schema.Types.ObjectId, ref: "ACTIONTYPE"},
    isShared: Boolean,
    title: String,
    url: String,
    like: [_LIKESCHEMA],
    comments: [{type: Schema.Types.ObjectId, ref: "COMMENTS"}]
}, userBaseClass));


var _COMMENTS = new Schema(_.extend({
    content : String,
    parent: {type: Schema.Types.ObjectId,ref:"COMMENTS"},
    replyTo: {type: Schema.Types.ObjectId, ref: "USER"}
}, userBaseClass));

// export them
exports.User = mongoose.model("USER", _USER);
exports.Task = mongoose.model("TASK", _TASK);
exports.Admin = mongoose.model("ADMIN", _ADMIN);
exports.Template = mongoose.model("TEMPLATE", _TEMPLATE);
exports.ActionType = mongoose.model("ACTIONTYPE",_ACTIONTYPE);
exports.PostActions = mongoose.model("POSTACTION", _POSTACTIONS);
exports.Comments = mongoose.model("COMMENT", _COMMENTS);
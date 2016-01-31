/**
 * Created by Pengfei on 2015/11/9.
 * User model mapping to USER table
 */


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Define User schema
var _USER = new Schema({
    phone : {type: String, unique: true, sparse: true},
    password : String,
    loginFrom: String, //3rd party {qq, weibo, weixin}
    loginAccount: String, //3rd party account
    name: String,
    createDate: Date
});

_User.index({loginFrom: 1, loginAccount: 1}, {unique: true});

// Define Task schema
var _TASK = new Schema({
    title : String,
    description : String,
    dueDate: Date,
    createDate: Date,
    completed: Boolean,
    user: {type: Schema.Types.ObjectId, ref: "USER"},

    //below fields are in all tables
    CreatedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    CreatedDate : Date,
    LastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    LastModifiedDate : Date
});

// added by chenlin on 2016

var _TEMPLATE = new Schema ({
    templateName : String,
    ActionTypeList : Array,
    TemplateStatus : String,
    TemplateType : String,
    //below fields are in all tables
    CreatedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    CreatedDate : Date,
    LastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    LastModifiedDate : Date
});


var _ACTIONTYPE = new Schema ({
    ActionTypeName : String,
    ActionPostLimit : String,
    //below fields are in all tables
    CreatedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    CreatedDate : Date,
    LastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    LastModifiedDate : Date
});


var _POSTACTIONS = new Schema ({
    ActionTypeId: {type: Schema.Types.ObjectId, ref: "ACTIONTYPE"},
    IsShared : Boolean,
    Title : String,
    URL : String,
    //below fields are in all tables
    CreatedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    CreatedDate : Date,
    LastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    LastModifiedDate : Date
});


var _LIKEEVENTS = new Schema ({
    PostActionId: {type: Schema.Types.ObjectId, ref: "POSTACTIONS"},
    IsLiked : Boolean,
    //below fields are in all tables
    CreatedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    CreatedDate : Date,
    LastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    LastModifiedDate : Date
});

var _COMMENTEVENTS = new Schema ({
    PostActionId: {type: Schema.Types.ObjectId, ref: "POSTACTIONS"},
    CommentContent : String,
    Parent: {type: Schema.Types.ObjectId,ref:"COMMENTEVENTS"},
    //below fields are in all tables
    CreatedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    CreatedDate : Date,
    LastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"},
    LastModifiedDate : Date
});

// export them
exports.USER = mongoose.model("USER", _USER, "USER");
exports.TASK = mongoose.model("TASK", _TASK, "TASK");

exports.TEMPLATE = mongoose.model("TEMPLATE", _TEMPLATE, "TEMPLATE");
exports.ACTIONTYPE = mongoose.model("ACTIONTYPE",_ACTIONTYPE,"ACTIONTYPE");
exports.POSTACTIONS = mongoose.model("POSTACTIONS", _POSTACTIONS,"POSTACTIONS");

exports.LIKEEVENTS = mongoose.model("LIKEEVENTS", _LIKEEVENTS,"LIKEEVENTS");
exports.COMMENTEVENTS = mongoose.model("COMMENTEVENTS", _COMMENTEVENTS,"COMMENTEVENTS");
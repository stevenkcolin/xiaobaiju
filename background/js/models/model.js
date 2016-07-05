/**
 * Created by Pengfei on 2015/11/9.
 * User model mapping to USER table
 */


var mongoose = require("mongoose");
var _ = require("underscore");

var Schema = mongoose.Schema;

var baseClass = {
    createdDate : Date,
    lastModifiedDate : Date,
    createdBy : {type: Schema.Types.ObjectId, ref: "USER"},
    lastModifiedBy : {type: Schema.Types.ObjectId, ref: "USER"}
};

// Define User schema
var _USER = new Schema(_.extend({
    password : String,
    loginFrom: String, //3rd party {qq, weibo, weixin, telephone}
    loginAccount: String, //3rd party account
    name: String,
    nickName: String,
    gender: String,  //F, M
    header: String,
    description: String,
    isAdmin: {type: Boolean, default: false}
}, baseClass));

_USER.index({loginFrom: 1, loginAccount: 1}, {unique: true});

// Define Admin schema
var _ADMIN = new Schema(_.extend({
    name: {type: String, unique: true},
    password : String,
    realName: String,
    userId: {type: Schema.Types.ObjectId, ref: "USER"}
}, baseClass));


// Define Goal Category schema
var _GOAL_CATEGORY = new Schema(_.extend({
    title : String,
    description : String,
    goalIds: [{type: Schema.Types.ObjectId, ref: "GOAL"}],
}, baseClass));

// Define Goal schema
var _GOAL = new Schema(_.extend({
    title : String,
    description : String,
    sequence: Number,
    isRecommend: {type: Boolean, default: false},
    isPersonal: {type: Boolean, default: false},
    icon: {type: Schema.Types.ObjectId, ref: "ATTACHMENT"},
    pic: {type: Schema.Types.ObjectId, ref: "ATTACHMENT"},
    defaultTaskIds: [{type: Schema.Types.ObjectId, ref: "TASK"}]
}, baseClass));

var _TASK = new Schema(_.extend({
    title : String,
    description : String,
    isPersonal: Boolean,
    icon: {type: Schema.Types.ObjectId, ref: "ATTACHMENT"},
    pic: {type: Schema.Types.ObjectId, ref: "ATTACHMENT"},
    contentType: Number,  //1.url, 2.pic/text,
    content: String,
    contentPics: String,
    frequency: Number //1. once 2. daily 3. weely
}, baseClass));

// added by chenlin on 2016

var _USER_GOAL_TASK = new  Schema(_.extend({
    userId: {type: Schema.Types.ObjectId, ref: "USER"},
    goalId: {type: Schema.Types.ObjectId, ref: "GOAL"},
    taskIds: [{type: Schema.Types.ObjectId, ref: "TASK"}]
}, baseClass));


var _TASK_ACTIVITY = new Schema(_.extend({
    taskId: {type: Schema.Types.ObjectId, ref: "TASK"},
    userId: {type: Schema.Types.ObjectId, ref: "USER"},
    goalId: {type: Schema.Types.ObjectId, ref: "GOAL"},
    content: String,
    pics: [{type: Schema.Types.ObjectId, ref: "ATTACHMENT"}],
    likes: [{
        user_id:{type: Schema.Types.ObjectId, ref: "USER"},
        createdDate: Date
    }],
    comments:[_.extend({
            content: String
        }, baseClass)],

    shares: [_.extend({
        to: Number
    }, baseClass)]
}, baseClass));

var _ATTACHMENT = new Schema(_.extend({
    contentType : String,
    mimeType : String,
    filename: String,
    path: String
}, baseClass));

// export them
exports.User = mongoose.model("USER", _USER);
exports.Admin = mongoose.model("ADMIN", _ADMIN);
exports.GoalCategory = mongoose.model("GOAL_CATEGORY", _GOAL_CATEGORY);
exports.Goal = mongoose.model("GOAL", _GOAL);
exports.Task = mongoose.model("TASK",_TASK);
exports.UserGoalTask = mongoose.model("USER_GOAL_TASK", _USER_GOAL_TASK);
exports.TaskActivity = mongoose.model("TASK_ACTIVITY", _TASK_ACTIVITY);
exports.Attachment = mongoose.model("ATTACHMENT", _ATTACHMENT);
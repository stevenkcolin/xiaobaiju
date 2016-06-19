<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="mws-panel grid_8">
        <div class="mws-panel-header">
            <span class="mws-i-24 i-list">管理员</span>
        </div>
        <div class="mws-panel-body">
            <form class="mws-form" v-on:submit.prevent="onSubmit" method="post">
                <div class="mws-form-inline">
                    <div class="mws-form-row">
                        <label>姓名</label>
                        <div class="mws-form-item small">
                            <input type="text" class="mws-textinput" v-model="admin.realName"
                                   required oninvalid="setCustomValidity('请输入姓名')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                    <div class="mws-form-row">
                        <label>账号</label>
                        <div class="mws-form-item small">
                            <input type="text" class="mws-textinput" v-model="admin.name"
                                   required oninvalid="setCustomValidity('请输入账号')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                    <div class="mws-form-row" v-if="!adminId">
                        <label>密码</label>
                        <div class="mws-form-item small">
                            <input type="password" class="mws-textinput" v-model="admin.password"
                                   required oninvalid="setCustomValidity('请输入密码')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                    <div class="mws-form-row" v-if="!adminId">
                        <label>确认密码</label>
                        <div class="mws-form-item small">
                            <input type="password" class="mws-textinput" v-model="confirmPwd"
                                   required oninvalid="setCustomValidity('请输入确认密码')" oninput="setCustomValidity('')"/>
                        </div>
                    </div>
                </div>
                <div class="mws-button-row">
                    <input type="submit" value="修改" class="mws-button green" v-show="adminId" v-on:click="clickUpdate" />
                    <input type="submit" value="添加" class="mws-button green" v-show="!adminId" v-on:click="clickAdd" />
                    <input type="button" value="修改密码" class="mws-button green" v-show="adminId" v-on:click="clickChangePwd" />
                    <input type="button" value="删除" class="mws-button red" v-show="adminId" v-on:click="clickDelete" />
                    <input type="button" value="返回" class="mws-button green" v-on:click="clickReturn"/>
                </div>
            </form>
        </div>
        <div id="changPwdDialog" title="修改密码">
            <table cellpadding=3>
                <tr>
                    <td>新密码：</td>
                    <td><input id="txtNewPass" type="password" class="txt01" v-model="newPwd" required></td>
                </tr>
                <tr>
                    <td>确认密码：</td>
                    <td><input id="txtRePass" type="password" class="txt01" v-model="confirmPwd" required></td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <a id="btnEp" class="easyui-linkbutton" href="#" v-on:click.prevent="changePwd">确定</a>
                        <a class="easyui-linkbutton" href="#" v-on:click.prevent="closePwd">取消</a>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <div id="changePwdMsg1">{{changePwdMsg}}</div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    var adminService = require('../../services/adminService'),
            jAlert = require('../../thirdParty/jquery.alert'),
            $ = require('jquery'),
            _ = require('underscore');
    require('jquery-ui');
    export default {

        components: {},

        data: function () {
            return {
                adminId: null,
                admin: {},
                action: null,
                confirmPwd: null,
                newPwd: null,
                changePwdMsg: null
            }
        },
        ready: function() {
            this.adminId = this.$route.params.id;
            var self = this;
            if (this.adminId) {
                adminService.getAdminById(self.adminId).then(
                        function (response) {
                            self.admin = response.result;
                        }
                )
            }
            $('#changPwdDialog').dialog({
                autoOpen: false,
                modal: true
            });
            this.changePwdMsg = null;
            this.confirmPwd = null;
            this.newPwd = null;
        },
        methods: {
            onSubmit: function() {
                var self = this;
                if (this.action === 'update') {
                    adminService.updateAdmin(this.admin).then(
                            function(response) {
                                self.admin = response.result;
                                jAlert.jAlert("管理员修改成功", "消息提示");
                            }
                    )
                } else if (this.action === 'add') {
                    if (this.admin.password !== this.confirmPwd) {
                        jAlert.jAlert("两次密码不一致", "消息提示");
                        return;
                    }
                    adminService.createAdmin(this.admin).then(
                            function(response) {
                                self.admin = response.result;
                                self.adminId = response.result._id;
                                jAlert.jAlert("管理员创建成功", "消息提示");
                            }
                    )
                }
            },
            clickUpdate: function() {
                this.action = 'update';
            },
            clickAdd: function() {
                this.action = 'add';
            },
            clickReturn: function() {
                this.$router.go("/main/admin");
            },
            clickChangePwd: function() {
                $('#changPwdDialog').dialog('open');
            },
            closePwd: function () {
                $('#changPwdDialog').dialog('close');
            },
            changePwd: function () {
                var self = this;
                if (_.isEmpty(this.newPwd) || _.isEmpty(this.confirmPwd)) {
                    this.changePwdMsg = '请输入新密码和确认密码';
                    return;
                }
                if (this.newPwd !== this.confirmPwd) {
                    this.changePwdMsg = '两次密码不一致！请重新输入';
                    return;
                }
                adminService.changePassword(this.adminId, this.newPwd).then(
                        function (data) {
                            self.closePwd();
                            jAlert.jAlert('密码修改成功', '消息提示');
                        }
                )
            },
            clickDelete: function() {
                var self = this;
                jAlert.jConfirm('确认要删除么？', '确认',function(result){
                    if (result) {
                        adminService.deleteAdmin(self.adminId).then(
                                function(response){
                                    jAlert.jAlert('管理员删除成功', '消息提示', function(){
                                        self.$router.go('/main/admin');
                                    });
                                }
                        )
                    }
                })
            }
        }
    }
</script>

<style>
    #changPwdDialog {
        background-color: rgba(0, 0, 0, 0.8);
        color:#FFF;
        width: 300px;
        height: 100%;
        text-align: center;
        border: 0;
        box-shadow: 0 2px 10px rgba(0,0,0,0.8);
    }
    #changPwdDialog a:visited{
        color:#FFF;
    }
    #changPwdDialog a:link{
        color:#FFF;
    }
    #changPwdDialog::backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
    }
    #changePwdMsg1{
        color:#fa4500;
    }
</style>

<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="mws-login">
        <div id="header">
       <span id="h1">小白驹</span><span id="error" v-show="noLogin">用户名或密码不正确</span>
        </div>
        <div class="mws-login-lock"><img src="../../resources/css/icons/24/locked-2.png" alt="" /></div>
        <div id="mws-login-form">
            <form class="mws-form" name="myform" v-on:submit.prevent="onSubmit" method="post">
                <div class="mws-form-row">
                    <div class="mws-form-item large">
                        <input type="text" class="mws-login-username mws-textinput" placeholder="用户名" autofocus
                               required oninvalid="setCustomValidity('请输入用户名')" oninput="setCustomValidity('')" v-model="name" />
                    </div>
                </div>
                <div class="mws-form-row">
                    <div class="mws-form-item large">
                        <input type="password" class="mws-login-password mws-textinput" placeholder="密码"
                               required oninvalid="setCustomValidity('请输入密码')" oninput="setCustomValidity('')" v-model="password"/>
                    </div>
                </div>
                <div class="mws-form-row">
                    <input type="submit" value="登录" class="mws-button green mws-login-button" />
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    var vue = require('vue');
    var vueResource = require('vue-resource');
    vue.use(vueResource);
    var router = require('vue-router');

    var constants = require('../constants');
    var adminService = require('../services/adminService');

    export default {
        name: 'NewsView',
        data: function () {
            return {
                name: '',
                password: '',
                noLogin: false
            }
        },

        ready: function() {
            this.name = null;
            this.password = null;
        },

        methods: {
            onSubmit: function() {
                var self = this;
                adminService.login(this.name, this.password).then(
                        function(data) {
                            self.$router.go('main');
                        },
                        function(error) {
                            self.noLogin = true;
                        }
                );
            }
        },

    }
</script>

<style lang="stylus">
</style>

<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="mws-panel grid_8" id="app">
        <div class="mws-panel-header">
            <span class="mws-i-24 i-table-1">查找用户</span>
        </div>
        <div class="mws-panel-body">
            <form class="mws-form" v-on:submit.prevent="onSubmit" method="post">
                <div>
                    <span class="user-search-div">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称: <input type="text" class="mws-textinput" v-model="user.nickName" /></span>
                    <span class="user-search-div">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号: <input type="text" class="mws-textinput" v-model="user.loginAccount" /></span>
                </div>
                <div>
                    <span class="user-search-div">
                        <div class="mws-form-item small">
                            账号来源: <select style="width:20%" v-model="user.loginFrom">
                                <option value ="telephone">电话号码</option>
                                <option value ="weixin">微信</option>
                                <option value ="qq">QQ</option>
                                <option value ="weibo">微博</option>
                            </select>
                        </div>
                    </span>
                </div>
                <div class="mws-button-row">
                    <input type="submit" value="查找" class="mws-button green" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    export default {
        components: {},

        data: function () {
            return {
                user: {
                    nickName: null,
                    loginAccount: null,
                    loginFrom: null
                }
            }
        },
        ready: function() {

        },
        methods: {
            onSubmit: function() {
                var params = {};
                if (this.user.nickName) params.nickName = this.user.nickName;
                if (this.user.loginAccount) params.loginAccount = this.user.loginAccount;
                if (this.user.loginFrom) params.loginFrom = this.user.loginFrom;
                this.$router.go({
                    path: '/main/userList',
                    query: params
                });
            }
        }

    }
</script>

<style>
    .user-search-div {
        padding:15px 15px 15px 15px;
        width: 40%;
        display:inline-block;
    }
</style>

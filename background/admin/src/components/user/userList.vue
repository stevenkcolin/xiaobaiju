<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="mws-panel grid_8" id="app">
        <div class="mws-panel-header">
            <span class="mws-i-24 i-table-1">用户列表</span>
        </div>
        <div class="mws-panel-body">
            <div class="dataTables_wrapper">
                <table class="mws-datatable-fn mws-table">
                    <thead>
                    <tr>
                        <th>账号</th>
                        <th>昵称</th>
                        <th>账号来源</th>
                        <th>是否是管理员</th>
                    </tr>
                    </thead>
                    <tbody v-for="user in userList">

                    <tr :class="{'gradeX even': $index % 2 === 0, 'gradeA odd': $index % 2 !== 0 }">
                        <td><a href="#" v-on:click.prevent="gotoDetail(user._id)">{{user.loginAccount || 'none'}}</a></td>
                        <td>{{user.nickName}}</td>
                        <td>{{user.loginFrom}}</td>
                        <td>{{user.isAdmin}}</td>
                    </tr>
                    </tbody>
                </table>
                <pagination v-bind:total="paging.total" :current-page="paging.currentPage" v-events="gotoPage: gotoPage"></pagination>
                </div>
        </div>
    </div>
</template>

<script>
    var userService = require('../../services/userService'),
            constant = require('../../constants'),
            pagination = require('../pagination.vue');

    export default {
        components: {
            pagination
        },

        data: function () {
            return {
                paging: {
                    start: 0,
                    total: 0,
                    lastPage: 0,
                    currentPage: 0,
                    pageList:[],
                },
                adminCriteria: {},
                userList: [],
            }
        },
        ready: function () {

        },
        route: {
            data : function({ to }){
                this.getParam();
                this.init();
            }
        },
        events: {
            gotoPage: function (page) {
                this.paging.start = (page - 1) * constant.ROWS;
                this.init();
            }
        },
        methods: {
            getParam: function() {
                this.adminCriteria = this.$route.query;
                if(this.$route.query.start) this.paging.start = this.$route.query.start;
            },
            setPages: function() {
                this.paging.currentPage = this.paging.start / constant.ROWS + 1;
                this.paging.pageList = [];
                for (var i = this.paging.currentPage - 2; i <= this.paging.lastPage; i++) {
                    if (i < 1) {
                        continue;
                    }
                    this.paging.pageList.push(i);
                    if (this.paging.pageList.length > 4) break;
                }
                console.log(this.paging.pageList, this.paging.lastPage);
            },
            init: function () {
                var self = this;
                this.userList = [];
                userService.searchUser(this.paging.start, this.adminCriteria).then(
                        function (response) {
                            self.userList = response.result.users;
                            self.paging.total = response.result.total;
                            self.paging.lastPage = self.paging.total%constant.ROWS == 0 ? parseInt(self.paging.total / constant.ROWS) : parseInt(self.paging.total / constant.ROWS) + 1;
                            self.setPages();
                        }
                )
            },
            gotoDetail: function (id) {
                this.$router.go('/main/userDetail/' + id);
            },
            gotoPage: function (page) {
//                this.paging.start = (page - 1) * constant.ROWS;
//                this.init();
                console.log(page);
            }
        }
    }
</script>

<style>
</style>
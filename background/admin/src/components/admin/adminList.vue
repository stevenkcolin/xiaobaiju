<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="mws-panel grid_8" id="app">
        <div class="mws-panel-header">
            <span class="mws-i-24 i-table-1">管理员列表</span>
        </div>
        <div class="mws-panel-body">
            <div class="mws-panel-toolbar top clearfix">
                <ul>
                    <li><a href="#" class="mws-ic-16 ic-add" v-on:click.prevent="clickAdd">添加</a></li>
                    <li><a href="#" class="mws-ic-16 ic-arrow-refresh" v-on:click.prevent="init">刷新</a></li>
                </ul>
            </div>
            <table class="mws-table">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>账号</th>
                </tr>
                </thead>
                <tbody>
                <tr class="gradeX" v-for="admin in adminList">
                    <td><a href="#" v-on:click.prevent="gotoDetail(admin._id)">{{admin.realName}}</a></td>
                    <td>{{admin.name}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    var adminService = require('../../services/adminService'),
            jAlert = require('../../thirdParty/jquery.alert');
    export default {
        components: {},

        data: function () {
            return {
                adminList: []
            }
        },
        ready: function() {
            this.init();
        },
        methods: {
            init: function() {
                var self = this;
                this.adminList = [];
                adminService.getAdminList().then(
                        function(response) {
                            self.adminList = response.result;
                            for (var i = 0; i < response.result.length; i++) {
                                self.adminList[i] = {
                                    _id: response.result[i]._id,
                                    name: response.result[i].name,
                                    realName: response.result[i].realName,
                                    checked: false
                                }
                            }
                        }

                )
            },
            gotoDetail: function(id) {
                this.$router.go('/main/adminDetail/'+id);
            },
            clickAdd: function(id) {
                this.$router.go('/main/adminDetail');
            }
        }
    }
</script>

<style>
</style>

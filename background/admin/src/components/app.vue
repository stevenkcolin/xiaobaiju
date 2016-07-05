<template>
    <!-- main view -->
    <div>
        <router-view
                class="view"
                keep-alive
                transition
                transition-mode="out-in">
        </router-view>
    </div>
</template>

<script>
    var constants = require('../constants.js'),
            router = require('vue-router'),
            adminService = require('../services/adminService');
    export default {
        data: function () {
            return {}
        },

        /*beforeCompile: function () {
            if (!adminService.checkIsLogin()) {
                console.log("aaaaaaaaaaaaaaaaa", this.$router);
                this.$router.go('login');
            }
        }*/
    }
</script>

<style lang="stylus">

</style>

<template>
    <div>
    <header-comp></header-comp>

    <div id="mws-wrapper">
        <side-menu></side-menu>

        <div id="mws-container" class="clearfix">
            <router-view></router-view>

            <footer-comp></footer-comp>

        </div>
    </div>
    </div>
</template>

<script>
    var headerComp = require('./header.vue');
    var footerComp = require('./footer.vue');
    var sideMenu = require('./sideMenu.vue');
    export default {

        name: 'main',

        components: {
            headerComp,
            footerComp,
            sideMenu
        },

        data: function(){
            return {
                user: {}
            }
        },
    }
</script>

<style>
</style>

<template xmlns:v-on="http://www.w3.org/1999/xhtml">

    <div class="dataTables_paginate paging_full_numbers">
        <span class="first paginate_button" v-on:click="gotoPage(1)">第一页</span>
        <span v-for="page in paging.pageList">
            <span :class="{'paginate_active': page == paging.currentPage, 'paginate_button': page != paging.currentPage }"
                  v-on:click="gotoPage(page)">{{page}}</span>
        </span>
        <span class="first paginate_button" v-on:click="gotoPage(paging.lastPage)">最后页</span></div>
    </div>
</template>

<script>
    var constant = require('../constants');
    export default {
        components: {},

        props:['total', 'currentPage'],

        data: function () {
            return {
                start: 0,
                lastPage: 0,
                pageList: []
            }
        },
        computed: {
            paging: function() {
                console.log(this.total, this.currentPage);
                var paging = {total: this.total, currentPage: this.currentPage};
                paging.start = (paging.currentPage - 1) * constant.ROWS;
                paging.lastPage = paging.total%constant.ROWS == 0 ? parseInt(paging.total / constant.ROWS) : parseInt(paging.total / constant.ROWS) + 1;
                console.log('paging.lastPage', paging.lastPage);
                var pageList = [];
                for (var i = paging.currentPage - 2; i <= paging.lastPage; i++) {
                    if (i < 1) {
                        continue;
                    }
                    pageList.push(i);
                    if (pageList.length > 4) break;
                }
                paging.pageList = pageList;
                console.log(paging.pageList, paging.lastPage);
                return paging;
            }
        },
        methods: {
            gotoPage: function (page) {
                console.log('aaaaaaaaaaaaa')
                this.$dispatch("gotoPage", page);
            }
        }
    }
</script>

<style>
</style>
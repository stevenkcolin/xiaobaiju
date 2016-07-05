/**
* Created by hepf3 on 6/5/2016.
*/
<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <div id="mws-sidebar-stitch"></div>
        <div id="mws-sidebar-bg"></div>
        <div id="mws-sidebar">
            <div id="mws-searchbox" class="mws-inset">
                <form>
                    <input type="text" class="mws-search-input" />
                    <input type="submit" class="mws-search-submit" />
                </form>
            </div>
            <div id="mws-navigation">
                <ul>
                    <li><a v-bind:href="adminUrl" class="mws-i-24 i-user-2">系统管理员</a></li>
                    <li><a v-bind:href="userUrl" class="mws-i-24 i-users-2">用户管理</a></li>
                    <li>
                        <a href="#" class="mws-i-24 i-flag">目标管理</a>
                        <ul>
                            <li><a href="form_layouts.html">类型</a></li>
                            <li><a href="form_elements.html">目标</a></li>
                        </ul>
                    </li>
                    <li><a href="widgets.html" class="mws-i-24 i-cog">Widgets</a></li>
                    <li><a href="typography.html" class="mws-i-24 i-text-styling">Typography</a></li>
                    <li><a href="grids.html" class="mws-i-24 i-blocks-images">Grids &amp; Panels</a></li>
                    <li><a href="gallery.html" class="mws-i-24 i-polaroids">Gallery</a></li>
                    <li><a href="error.html" class="mws-i-24 i-alert-2">Error Page</a></li>
                    <li>
                        <a href="icons.html" class="mws-i-24 i-pacman">
                            Icons <span class="mws-nav-tooltip">2000+</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        components: {},

        data: function () {
            return {
                adminUrl: '/#!/main/admin',
                userUrl: '/#!/main/user'
            }
        }
    }
</script>
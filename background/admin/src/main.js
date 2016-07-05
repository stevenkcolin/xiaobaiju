import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import app from './components/app.vue'
import login from './components/login.vue'
import main from './components/main.vue'
import adminService from './services/adminService'
import welcome from './components/welcome.vue'
import adminList from './components/admin/adminList.vue'
import adminDetail from './components/admin/adminDetail.vue'
import userSearch from './components/user/userSearch.vue'
import userList from './components/user/userList.vue'

// install router
Vue.use(Router);

// register filters globally
//Vue.filter('fromNow', fromNow);
//Vue.filter('domain', domain);

// routing
var router = new Router();

router.map({
    '/': {
        component: login
    },

    '/login': {
        component: login
    },
    '/main': {
        component: main,
        subRoutes: {
            '/': {
                component: welcome
            },
            '/admin': {
                component: adminList
            },
            '/adminDetail/:id': {
                component: adminDetail
            },
            '/adminDetail': {
                component: adminDetail
            },
            '/user': {
                component: userSearch
            },
            '/userList': {
                component: userList
            }
        }
    }

});

router.beforeEach(function (transition) {
    if (!adminService.checkIsLogin() && transition.to.path !== '/' && transition.to.path !== '/login') {
        transition.redirect('login')
    }
    transition.next();
});

router.start(app, '#app');

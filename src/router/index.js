import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {title: '首页'},
        component: () => import('@/views/Home'),
        redirect: '/1-1',
        children:[{
            path: '/1-1',
            name: 'memberInfo',
            meta: {title: 'VIP信息'},
            component: () => import('@/components/MemberInfo/MemberInfo')
        },{
            path: '/1-2-1',
            name: 'a',
            meta: {title: '演示页面'},
            component: () => import('@/views/Demo')
        },{
            path: '/1-2-2',
            name: 'b',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/1-2-3',
            name: 'c',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/2-1',
            name: 'd',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/2-2',
            name: 'e',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/2-3',
            name: 'f',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/2-4',
            name: 'g',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/3-1',
            name: 'h',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/3-2',
            name: 'i',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/4-1',
            name: 'j',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        },{
            path: '/4-2',
            name: 'k',
            meta: {requireAuth: true},
            component: () => import('@/views/error/404')
        }]
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register'),
        meta: {title:'注册'}
    },{
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login'),
        meta: {title:'登录'}
    },{
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404'),
        meta: {title:'404-NotFound'}
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];

//捕捉跳转异常，使不报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
    routes
})

export default router

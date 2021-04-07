import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {requireAuth: true},
        component: () => import('@/views/Home'),
        redirect: '/1-1',
        children:[{
            path: '/1-1',
            name: 'memberInfo',
            meta: {requireAuth: true},
            component: () => import('@/components/MemberInfo')
        },{
            path: '/1-2-1',
            name: 'a',
            meta: {requireAuth: true},
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
        meta: {title:'注册'}
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
]

const router = new VueRouter({
    routes
})

export default router

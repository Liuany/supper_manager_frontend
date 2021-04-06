import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
        redirect: '/1-1',
        children:[{
            path: '/1-1',
            name: 'memberInfo',
            component: () => import('@/components/MemberInfo')
        },{
            path: '/1-2-1',
            name: 'a',
            component: () => import('@/views/Demo')
        },{
            path: '/1-2-2',
            name: 'b',
            component: () => import('@/components/Defualt')
        },{
            path: '/1-2-3',
            name: 'c',
            component: () => import('@/components/Defualt')
        },{
            path: '/2-1',
            name: 'd',
            component: () => import('@/components/Defualt')
        },{
            path: '/2-2',
            name: 'e',
            component: () => import('@/components/Defualt')
        },{
            path: '/2-3',
            name: 'f',
            component: () => import('@/components/Defualt')
        },{
            path: '/2-4',
            name: 'g',
            component: () => import('@/components/Defualt')
        },{
            path: '/3-1',
            name: 'h',
            component: () => import('@/components/Defualt')
        },{
            path: '/3-2',
            name: 'i',
            component: () => import('@/components/Defualt')
        },{
            path: '/4-1',
            name: 'j',
            component: () => import('@/components/Defualt')
        },{
            path: '/4-2',
            name: 'k',
            component: () => import('@/components/Defualt')
        }]
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register'),
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

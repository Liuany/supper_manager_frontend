import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/auth/Login'),
        hidden: true,
        meta: {title: '用户登录'}
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true,
        meta: {title:'404-NotFound'}
    }
]

const createRouter = () => new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y:0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router

//捕捉跳转异常，使不报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
}

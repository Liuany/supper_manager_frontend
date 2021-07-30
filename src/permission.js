import router from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

import NProgress from 'nprogress' // 网页加载进度条
import 'nprogress/nprogress.css'
import { getToken } from "@/utils/auth"
import { getAsyncRoutes } from '@/utils/asyncRouter'

NProgress.configure({showSpinner: false}) // NProgress 配置

//定义路由白名单
const whiteList = ['/login'];

//每次路由之前会调用的方法，'to'代表起始路由，'from'代表目标路由， 'next'表示执行跳转操作
router.beforeEach (async (to, from, next) => {
    //开始加载进度条
    NProgress.start()
    //设置页面标题
    document.title = getPageTitle(to.meta.title)

    //获取token，判断当前用户是否登录
    const hasToken = getToken()
    
    if (hasToken) {
        //当token存在且目标路由为'/login'不再重新登录，跳转至主页
        if (to.path === '/login') {
            //登录跳转至首页
            next({path: '/'})
            NProgress.done()
        } else {
            // 获取用户信息
            await store.dispatch('user/getInfo')
            //异步获取store中的路由
            let route = await store.state.user.routes;
            const hasRouters = route && route.length>0;
            //判断store中是否有路由，若有，进行下一步
            if ( hasRouters ) {
                next()
            } else {
                //store中没有路由，则需要获取获取异步路由，并进行格式化处理
                try {
                    // 设置路由信息
                    store.dispatch('user/addRoutes').then(() => {
                        const accessRoutes = getAsyncRoutes( store.state.user.routes )
                        // 动态添加格式化过的路由
                        router.addRoutes(accessRoutes);
                        next({ ...to, replace: true })
                    })
                } catch (error) {
                    // Message.error('出错了')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        //当token不存在时直接跳转至登录页面
        if (whiteList.indexOf(to.path) != -1) {
            next()
        } else {
            next(`/login?redirect=$(to.path)`)
            NProgress.done()
        }
    }
})

router.afterEach (() => {
    //关闭进度加载条
    NProgress.done()
})
import router from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

import NProgress from 'nprogress' // 网页加载进度条
import 'nprogress/nprogress.css'
import {getToken} from "@/utils/auth"; 

NProgress.configure({showSpinner: false}) // NProgress 配置

//每次路由之前会调用的方法，'to'代表起始路由，'from'代表目标路由， 'next'表示执行跳转操作
router.beforeEach (async (to, from, next) => {
    //开始加载进度条
    NProgress.start()
    //设置页面标题
    document.title = getPageTitle(to.meta.title)

    //获取token
    const hasToken = getToken()
    
    if (hasToken) {
        //当token存在且目标路由为'/login'不再重新登录，跳转至主页
        if (to.path === '/login') {
            //登录跳转至首页
            next({path: '/'})
            NProgress.done()
        } else {
            //当token存在且目标路由不为'/login'时，获取当前登录用户信息后进行跳转
            await store.dispatch("user/getInfo")
            next()
        }
    } else {
        //当token不存在时直接跳转至登录页面
        next()
    }
})

router.afterEach (() => {
    //关闭进度加载条
    NProgress.done()
})
import { getUserInfo, login, logout, getRoutes } from "@/api/auth/auth"
import {getToken, setToken, removeToken, setRoutes} from "@/utils/auth"
import { getAsyncRoutes } from '@/utils/asyncRouter'

import router from '@/router'

const state = {
    token: getToken(),    //token
    user: "",   //用户对象
    routes: []  //路由
}

const mutations = {
    SET_TOKEN_STATE: (state, token) => {
        state.token = token
    },
    SET_USER_STATE: (state, user) => {
        state.user = user
    },
    SET_ROUTES_STATE: (state, routes) => {
        state.routes = routes
    }
}

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        const {userName, passWord, rememberMe } = userInfo;
        return new Promise((resolve, reject) => {
            login({userName: userName.trim(), passWord: passWord, rememberMe: rememberMe})
            .then((response) => {
                const { data } = response;
                commit ("SET_TOKEN_STATE", data.token);
                setToken(data.token);
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    // 获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo().then((response) => {
                const { data } = response;
                if (!data) {
                    commit("SET_TOKEN_STATE","");
                    commit("SET_USER_STATE","");
                    remobeToken();
                    resolve();
                    reject("认证失败，请重新登录！");
                }
                commit("SET_USER_STATE", data);
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    // 注销
    logout({ commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token)
              .then((response) => {
                commit("SET_TOKEN_STATE", "");
                commit("SET_USER_STATE", "");
                removeToken();
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    //存储路由
    addRoutes( {commit} ) {
        return new Promise((resolve) => {
            // getRoutes(userInfo)
            //   .then((response) => {
            //       const { data } = response
            //       //将动态路由存入store中
            //       commit("SET_ROUTES_STATE", data)
            //       //将路由数据存入cookie中
            //       setRoutes(data.token)
            //       resolve()
            //   })
            //   .catch((error) => {
            //     reject(error)
            // })

            const routerList = [
                {
                    "path": "/",
                    "component": "views/Home",
                    "redirect": "/memberInfo",
                    "name": "Home",
                    "meta": {
                        "title": "首页",
                    },
                    "children": [
                        {
                            "path": "/member/memberInfo",
                            "component": "components/MemberInfo/MemberInfo",
                            "name": "MemberInfo",
                            "meta": { "title": "会员管理" }
                        },
                        {
                            "path": "/config/menu",
                            "component": "components/Menu/MenuManager",
                            "name": "menu",
                            "meta": { "title": "菜单管理", "noCache": "menu" }
                        },
                        {
                            "path": "/staff/staffInfo",
                            "component": "components/Staff/StaffInfo",
                            "name": "menu",
                            "meta": { "title": "菜单管理", "noCache": "menu" }
                        },
                        {
                            "path": "/finance/dailyIcome",
                            "component": "components/Finance/DailyIcomeList",
                            "name": "menu",
                            "meta": { "title": "菜单管理", "noCache": "menu" }
                        }
                    ]
                }
            ]

            //将动态路由存入store中
            commit("SET_ROUTES_STATE", routerList)
            //将路由数据存入cookie中
            setRoutes(routerList)
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
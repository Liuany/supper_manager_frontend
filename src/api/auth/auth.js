import request from '@/utils/request'

// 用户注册
export function userRegister(userDTO) {
    return request({
        url: '/sm/user/register',
        method: 'post',
        data: userDTO
    });
}

// 用户登录
export function login(data) {
    return request({
        url: 'sm/user/login',
        method: 'post',
        data: data
    });
}

// 获取用户信息
export function getUserInfo() {
    return request({
        url: 'sm/user/info',
        method: 'get'
    });
}

// 注销
export function logout() {
    return request({
        url: 'sm/user/logout'
    });
}
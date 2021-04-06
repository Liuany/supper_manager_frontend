import request from '@/utils/request'

export function userRegister(userDTO) {
    return request({
        url:'/sm/user/register',
        method:'post',
        data:userDTO
    });
}
import request from '@/utils/request'

export function getMemberInfo() {
    return request({
        url:'/memberInfo/getListByPage',
        method:'get'
    });
}
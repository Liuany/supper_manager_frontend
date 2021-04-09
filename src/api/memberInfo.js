import request from '@/utils/request'

export function getMemberInfo(pageNo, size) {
    return request({
        url:'/memberInfo/getListByPage',
        method:'get',
        params: { pageNo: pageNo, size: size }
    });
}
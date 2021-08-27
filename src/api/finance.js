import request from '@/utils/request'

export function getDailyIncome (pageNo, size){
    return request({
        url:'sm/daily/getListByPage',
        method:'get',
        params: { pageNo: pageNo, size: size }
    })
}
import request from '@/utils/request'

export function getStaffInfo(pageNo, size) {
    return request({
        url:'sm/staff/getListByPage',
        method:'get',
        params: { pageNo: pageNo, size: size }
    })
}

export function save(data) {
    return request({
        url:'sm/staff/save',
        method:'post',
        data: data
    })
}

export function delById (id) {
    return request({
        url: 'sm/staff/delById',
        method:'delete',
        params: {id: id}
    })
}

export function searchStaffByPage(pageNo, pageSize, data) {
    return request({
        url:'sm/staff/searchStaffByPage',
        method:'post',
        params: {pageNo:pageNo, pageSize:pageSize},
        data: data
    })
}
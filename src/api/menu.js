import request from '@/utils/request'

export function loadMenu() {
    return request({
        url: 'sys/menu/loadMenu',
        method: 'get'
    });
}

export function getMenuByPage(pageNo, size) {
    return request({
        url:'sys/menu/getMenuByPage',
        method:'get',
        params: { pageNo: pageNo, size: size }
    });
}

export function save(data) {
    return request({
        url:'sys/menu/save',
        method:'post',
        data: data
    });
}
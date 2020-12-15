import request from '@/utils/request'

export function homeTableList() {
    return request({
        url: '/sale/statistics/index',
        method: 'get'
    })
}
// export function homeEchartList() {
//     return request({
//         url: '/sale/area/list',
//         method: 'get'
//     })
// }
// export function homeBarList() {
//     return request({
//         url: '/sale/area/list',
//         method: 'get'
//     })
// }
// export function homeLineList() {
//     return request({
//         url: '/sale/area/list',
//         method: 'get'
//     })
// }
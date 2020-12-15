import request from '@/utils/request'

export function saleStatistics(data) {
  return request({
    url: '/sale/statistics/saleInfo',
    method: 'get',
    params: data
  })
}
export function exportExcleStatistics(data) {
  return request({
    url: '/sale/statistics/excel/export',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

import request from '@/utils/request'

export function getAreaList() {
  return request({
    url: '/sale/area/list',
    method: 'get'
  })
}

export function getAreaPage(query) {
  return request({
    url: '/sale/area/page',
    method: 'get',
    params: query
  })
}

export function addAreaObj(obj) {
  return request({
    url: '/sale/area',
    method: 'post',
    data: obj
  })
}

export function getAreaObj(id) {
  return request({
    url: '/sale/area/' + id,
    method: 'get'
  })
}

export function delAreaObj(id) {
  return request({
    url: '/sale/area/' + id,
    method: 'delete'
  })
}

export function updateAreaObj(obj) {
  return request({
    url: '/sale/area',
    method: 'put',
    data: obj
  })
}


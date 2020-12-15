import request from '@/utils/request'

export function getCustomerList(query) {
  return request({
    url: '/sale/customer/page',
    method: 'get',
    params: query
  })
}

export function getCustomerLike(query) {
  return request({
    url: '/sale/customer/like',
    method: 'get',
    params: {
      customerName: query
    }
  })
}
export function addCustomerObj(obj) {
  return request({
    url: '/sale/customer',
    method: 'post',
    data: obj
  })
}

export function getCustomerObj(id) {
  return request({
    url: '/sale/customer/' + id,
    method: 'get'
  })
}

export function delCustomerObj(id) {
  return request({
    url: '/sale/customer/' + id,
    method: 'delete'
  })
}

export function updateCustomerObj(obj) {
  return request({
    url: '/sale/customer',
    method: 'put',
    data: obj
  })
}


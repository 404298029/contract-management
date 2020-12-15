import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function restpass(query) {
  return request({
    url: '/user/restpass',
    method: 'post',
    params: {
      id: query
    }
  })
}

export function changepass(query) {
  return request({
    url: '/user/changepass',
    method: 'post',
    params: query
  })
}

export function getUserList(query) {
  return request({
    url: '/user/page',
    method: 'get',
    params: query
  })
}

export function addUserObj(obj) {
  return request({
    url: '/user',
    method: 'post',
    data: obj
  })
}

export function getUserObj(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function delUserObj(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function updateUserObj(obj) {
  return request({
    url: '/user',
    method: 'put',
    data: obj
  })
}


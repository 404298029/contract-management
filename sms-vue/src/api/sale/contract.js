import request from '@/utils/request'

export function getContractList(query) {
  return request({
    url: '/sale/contract/page',
    method: 'get',
    params: query
  })
}

export function getContractupde(query) {
  return request({
    url: '/sale/contract/notUnStandList',
    method: 'get',
    params: query
  })
}

export function getnotUnStandCount() {
  return request({
    url: '/sale/contract/notUnStandCount',
    method: 'get'
  })
}

export function addContractObj(obj) {
  return request({
    url: '/sale/contract',
    method: 'post',
    data: obj
  })
}

export function getContractObj(id) {
  return request({
    url: '/sale/contract/' + id,
    method: 'get'
  })
}

export function delContractObj(id) {
  return request({
    url: '/sale/contract/' + id,
    method: 'delete'
  })
}

export function updateContractObj(obj) {
  return request({
    url: '/sale/contract',
    method: 'put',
    data: obj
  })
}

export function exportExcleContract(data) {
  return request({
    url: '/sale/contract/excel/export/contract',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

export function excelupload(file) {
  var formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/sale/contract/excel/upload',
    method: 'post',
    data: formData
  })
}

export function exceltemplate() {
  return request({
    url: '/sale/contract/excel/export/template',
    method: 'get',
    responseType: 'blob'
  })
}

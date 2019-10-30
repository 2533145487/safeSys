import request from '@/utils/request'

// 获取所有的权限树
export function getPermissionTree() {
  return request({
    url: 'api/permissions/tree',
    method: 'get'
  })
}

export function get() {
  return request({
    url: 'api/sysWbs',
    method: 'get'
  })
}

export function add(id,data) {
  return request({
    url: 'api/sysWbs/?id='+id,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/sysWbs/' +id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/sysWbs',
    method: 'put',
    data
  })
}

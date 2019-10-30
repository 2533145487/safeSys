import request from '@/utils/request'

export function getAllJob(deptId) {
  const params = {
    deptId,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/riskChecklist',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/riskChecklist',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/riskChecklist/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/riskChecklist',
    method: 'put',
    data
  })
}
export function getInfo(id) {
  return request({
    url: 'api/riskChecklistbyup/' + id,
    method: 'get'
  })
}

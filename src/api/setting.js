import request from '@/utils/request'

// 获取所有角色列表
export const getAllRoleList = (params) => {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}
// 获取企业信息
export const getCompanyInfo = (id) => {
  return request({
    method: 'GET',
    url: '/company/' + id
  })
}
// 新增角色
export const addRole = (data) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data
  })
}
// 删除角色
export const delRole = (id) => {
  return request({
    method: 'DELETE',
    url: '/sys/role/' + id
  })
}
// 获取当前角色详情
export const getRoleDetail = (id) => {
  return request({
    method: 'GET',
    url: '/sys/role/' + id
  })
}
// 编辑当前角色信息
export const editRole = (data) => {
  return request({
    method: 'PUT',
    url: '/sys/role/' + data.id,
    data
  })
}
// 给角色分配权限
export const allotRolePerm = (data) => {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data
  })
}

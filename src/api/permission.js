import request from '@/utils/request'

// 获取所有权限点
export const getAllPermissionList = () => {
  return request({
    method: 'GET',
    url: '/sys/permission'
  })
}
// 添加权限点
export const addPermission = (data) => {
  return request({
    method: 'POST',
    url: '/sys/permission',
    data
  })
}
// 删除权限点
export const removePermission = (id) => {
  return request({
    method: 'DELETE',
    url: '/sys/permission/' + id
  })
}
// 编辑权限点
export const editPermission = (data) => {
  return request({
    method: 'PUT',
    url: '/sys/permission/' + data.id,
    data
  })
}
// 获取当前权限点
export const getCurrentPermissions = (id) => {
  return request({
    method: 'GET',
    url: '/sys/permission/' + id
  })
}

import request from '@/utils/request'

// 获取员工简单列表
export const getSimpleUserInfo = () => {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
// 获取员工列表
export const getEmployeesList = (params) => {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}
// 删除员工列表
export const delEmployeesList = (id) => {
  return request({
    method: 'DELETE',
    url: '/sys/user/' + id
  })
}
// 添加员工
export const addEmployees = (data) => {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}
// 批量添加员工
export const addAllEmployees = (data) => {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}
// 保存员工基本信息
export const saveEmployeesInfo = (data) => {
  return request({
    method: 'PUT',
    url: '/sys/user/' + data.id,
    data
  })
}
// 获取员工个人信息
export const getEmployeesInfo = (id) => {
  return request({
    method: 'GET',
    url: `/employees/${id}/personalInfo`
  })
}
// 保存员工个人信息
export const saveEmployeesInfoAll = (data) => {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}
// 获取员工岗位信息
export const getEmployeesJobInfo = (id) => {
  return request({
    method: 'GET',
    url: `/employees/${id}/jobs`
  })
}
// 保存员工岗位信息
export const saveEmployeesJobInfo = (data) => {
  return request({
    method: 'PUT',
    url: `/employees/${data.id}/jobs`,
    data
  })
}
// 给员工分配角色
export const allotRole = (data) => {
  return request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data
  })
}

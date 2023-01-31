import request from '@/utils/request'

// 获取部门列表
export const getDepartmentList = () => {
  return request({
    url: '/company/department'
  })
}
// 删除部门
export const delDepartment = (id) => {
  return request({
    method: 'DELETE',
    url: '/company/department/' + id
  })
}
// 新增部门
export const addDepartmentList = (data) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}
// 修改部门
export const editDepartmentList = (id, data) => {
  return request({
    method: 'PUT',
    url: '/company/department/' + id,
    data
  })
}

import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getInfo(token) {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

// 获取用户基本信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}

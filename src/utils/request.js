import axios from 'axios'
import store from '@/store/index'
import router from '@/router/index'
import { getTimeLimit } from '@/utils/auth'
import { Message } from 'element-ui'

// token过期时间 单位 秒
const time = 6000
const service = axios.create({
  baseURL: '/koa',
  timeout: 10000
})

service.interceptors.request.use(req => {
  if (store.getters.token) {
    if ((Date.now() - getTimeLimit()) / 1000 >= time) return Promise.reject(new Error('Token过期了'))
  }
  if (store.getters.token && !req.headers.Authorization) {
    req.headers.Authorization = 'Bearer ' + store.getters.token
  }
  return req
}, err => {
  return Promise.reject(new Error(err.message))
})

service.interceptors.response.use(res => {
  if (!res.data.success) {
    Message.error(res.data.message)
    return Promise.reject(new Error(res.data.message))
  } else {
    return res.data
  }
}, err => {
  if (err.message === 'Token过期了' || err.response && err.response.data.code === 10002) {
    store.commit('user/removeAll')
    router.push('/login')
    if (err && err.response && err.response.data.code) {
      Message.error(err.message)
    }
  }
  return Promise.reject(new Error(err))
})

export default service

import { setToken, getToken, removeToken, saveTime } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    status: false
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(data)
    },
    setUserInfo(state, data) {
      state.userInfo = data
      state.status = true
    },
    removeAll(state) {
      removeToken()
      state.userInfo = {}
      state.token = null
    }
  },
  actions: {
    async sendLogin(store, userData) {
      const res = await login(userData)
      saveTime()
      const { data, message } = res
      store.commit('setToken', data)
      Message.success(message)
    },
    async getUserInfo(store) {
      const userInfo = await getInfo(store.state.token)
      const UserDetail = await getUserDetailById(userInfo.data.userId)
      const res = { ...userInfo.data, ...UserDetail.data }
      store.commit('setUserInfo', res)
      return res.roles.menus
    }
  }
}


import { dynamicRouter, staticRoutes } from '@/router/index'
export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    getRoutes(state, data) {
      state.routes = data
    }
  },
  actions: {
    screenRouter(store, res) {
      const newDynamicRouter = dynamicRouter.filter(item => res.includes(item.name))
      newDynamicRouter.push({ path: '*', redirect: '/404', hidden: true })
      store.commit('getRoutes', [...staticRoutes, ...newDynamicRouter])
      return newDynamicRouter
    }
  }
}

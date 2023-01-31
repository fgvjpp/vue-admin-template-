import router from '@/router/index'
import store from '@/store/index'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const whiteList = ['/login', '/404']
  if (store.getters.token) {
    if (to.path !== '/login') {
      if (!store.state.user.userInfo.userId) {
        const res = await store.dispatch('user/getUserInfo')
        const newDynamicRouter = await store.dispatch('permission/screenRouter', res)
        router.addRoutes(newDynamicRouter)
        next(to.path)
      } else {
        next()
      }
    } else {
      next('/')
      NProgress.done()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      Message.error('您还未登录')
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

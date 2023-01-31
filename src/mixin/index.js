import store from '@/store/index'
export const checkPermissions = {
  methods: {
    checkPermissions(data) {
      return store.getters.userInfo.roles.points.includes(data)
    }
  }
}

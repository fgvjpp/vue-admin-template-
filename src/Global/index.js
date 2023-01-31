import * as directives from '@/directives/index.js'
import * as filters from '@/filters/index'
import pageTools from '@/components/pageTools'
import uploadExcel from '@/components/UploadExcel/index.vue'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('uploadExcel', uploadExcel)
    // 循环遍历注册全局自定义指令
    for (const key in directives) {
      Vue.directive(key, directives[key])
    }
    for (const key in filters) {
      Vue.filter(key, filters[key])
    }
  }
}

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getCookies } from '@/utils/auth'
import en from 'element-ui/lib/locale/lang/en'
import cn from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
const messages = {
  en: {
    approvals: 'approvals',
    attendances: 'attendances',
    departments: 'departments',
    employees: 'employees',
    permissions: 'permission',
    salarys: 'salarys',
    settings: 'settings',
    social_securitys: 'social_securitys',
    dashboard: 'dashboard',
    ...en,
    route: {
      approvals: 'approvals',
      attendances: 'attendances',
      departments: 'departments',
      employees: 'employees',
      permissions: 'permission',
      salarys: 'salarys',
      settings: 'settings',
      social_securitys: 'social_securitys',
      dashboard: 'dashboard'
    }
  },
  cn: {
    approvals: '审批',
    attendances: '考勤',
    departments: '组织架构',
    employees: '员工管理',
    permissions: '权限',
    salarys: '工资',
    settings: '公司设置',
    social_securitys: '社保',
    dashboard: '首页',
    ...cn,
    route: {
      approvals: '审批',
      attendances: '考勤',
      departments: '组织架构',
      employees: '员工管理',
      permissions: '权限',
      salarys: '工资',
      settings: '公司设置',
      social_securitys: '社保',
      dashboard: '首页'
    }
  }
}

export default new VueI18n({
  locale: getCookies('lang') || 'cn',
  messages
})

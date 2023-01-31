import Layout from '@/layout'
export default {
  path: '/',
  name: 'settings',
  component: Layout,
  children: [{
    path: 'setting',
    name: 'settings',
    component: () => import('@/views/setting/index'),
    meta: { title: '公司设置', icon: 'dashboard' }
  }]
}

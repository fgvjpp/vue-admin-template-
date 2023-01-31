import Layout from '@/layout'
export default {
  path: '/',
  name: 'departments',
  component: Layout,
  children: [{
    path: 'departments',
    name: 'departments',
    component: () => import('@/views/departments/index'),
    meta: { title: '组织架构', icon: 'tree' }
  }]
}

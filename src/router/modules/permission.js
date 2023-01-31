import Layout from '@/layout'
export default {
  path: '/',
  name: 'permissions',
  component: Layout,
  children: [{
    path: 'permission',
    name: 'permissions',
    component: () => import('@/views/permission/index'),
    meta: { title: '权限', icon: 'nested' }
  }]
}

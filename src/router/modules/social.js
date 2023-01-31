import Layout from '@/layout'
export default {
  path: '/',
  name: 'social_securitys',
  component: Layout,
  children: [{
    path: 'social',
    name: 'social_securitys',
    component: () => import('@/views/social/index'),
    meta: { title: '社保', icon: 'form' }
  }]
}

import Layout from '@/layout'
export default {
  path: '/',
  name: 'attendances',
  component: Layout,
  children: [{
    path: 'attendances',
    name: 'attendances',
    component: () => import('@/views/attendances/index'),
    meta: { title: '考勤', icon: 'example' }
  }]
}

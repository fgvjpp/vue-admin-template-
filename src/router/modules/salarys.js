import Layout from '@/layout'
export default {
  path: '/',
  component: Layout,
  name: 'salarys',
  children: [{
    path: 'salarys',
    name: 'salarys',
    component: () => import('@/views/salarys/index'),
    meta: { title: '工资', icon: 'table' }
  }]
}

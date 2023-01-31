import Layout from '@/layout'
export default {
  path: '/',
  name: 'approvals',
  component: Layout,
  children: [{
    path: 'approvals',
    name: 'approvals',
    component: () => import('@/views/approvals/index'),
    meta: { title: '审批', icon: 'eye-open' }
  }]
}

import Layout from '@/layout'
export default {
  path: '/',
  name: 'employees',
  component: Layout,
  children: [{
    path: 'employees',
    name: 'employees',
    component: () => import('@/views/employees/index'),
    meta: { title: '员工', icon: 'user' }
  }, {
    path: 'employees/detail/:id',
    name: 'employeesDetail',
    hidden: true,
    component: () => import('@/views/employees/detail'),
    meta: { title: '员工详情' }
  }, {
    path: 'employees/print/:id',
    name: 'employeesPrint',
    hidden: true,
    component: () => import('@/views/employees/print'),
    meta: { title: '打印' }
  }]
}

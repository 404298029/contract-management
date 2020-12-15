/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const system = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'System',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'setting',
    roles: ['ROLE_SUPERADMIN']
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/user/index'),
      name: 'User',
      meta: {
        title: '用户管理',
        noCache: false,
        icon: 'peoples',
        roles: ['ROLE_SUPERADMIN']
      }
    }
  ]
}

export default system

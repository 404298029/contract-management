/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const sale = {
  path: '/sale',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Sale',
  meta: {
    title: '销售管理',
    icon: 'sale'
  },
  children: [
    {
      path: 'statistics',
      component: () => import('@/views/sale/saleStatistics/index'),
      name: 'SaleStatistics',
      meta: { title: '销售统计', noCache: true, icon: 'salebi' }
    },
    {
      path: 'contract',
      component: () => import('@/views/sale/contract/index'),
      name: 'Contract',
      meta: { title: '合同清单', noCache: false, icon: 'contract' }
    },
    {
      path: 'customer',
      component: () => import('@/views/sale/customer/index'),
      name: 'Customer',
      meta: { title: '客户管理', noCache: false, icon: 'customer' }
    },
    {
      path: 'area',
      component: () => import('@/views/sale/area/index'),
      name: 'Sub',
      meta: { title: '区域管理', noCache: false, icon: 'area' }
    },
    {
      path: 'excle',
      component: () => import('@/views/sale/contract/excle')
    }
  ]
}

export default sale

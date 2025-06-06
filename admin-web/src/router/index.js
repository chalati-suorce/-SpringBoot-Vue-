import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/admin',
    hidden: true
  },


  //后台
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/admin/index'),
        meta: { title: '后台首页' },
      },
      {
        path: 'admin',
        component: () => import('@/views/admin/admin'),
        meta: { title: '管理员管理' }
      },
      {
        path: 'user',
        component: () => import('@/views/admin/user'),
        meta: { title: '用户管理' }
      },
      {
        path: 'doctor',
        component: () => import('@/views/admin/doctor'),
        meta: { title: '医生管理' }
      },
      {
        path: 'news',
        component: () => import('@/views/admin/news'),
        meta: { title: '科普知识管理' }
      },
      {
        path: 'orders',
        component: () => import('@/views/admin/orders'),
        meta: { title: '挂号管理' }
      },
    ]
  },
  {
    path: '/admin/login',
    hidden: true,
    component: () => import('@/views/admin/login'),
    meta: { title: '后台登陆', icon: 'dashboard', }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

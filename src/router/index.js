import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

// createRouter用于创建路由实例
// 配置history模式
// history模式 => createWebHistory
// hasj模式 => createWebHashHistory

// import.meta.env.BASE_URL是vite中的环境变量
// 可以在vite.config.js中配置base:'/xx'，这样路由地址就会以xx为前缀，默认是'/'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 括号里面是配置路由地址的前缀
  // 异步路由配置
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 未登录拦截，设置路由导航守卫，与vue2不同的是没有了next，而是通过return来拦截/方性
// 什么都不写，也不return ，默认放行
// 根据返回值决定是方性还是拦截
// 1.undefined/true放行
// 2.false 拦截至from的页面
// 3.返回具体路由,对象或路径
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
  return true
})

export default router

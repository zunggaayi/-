import { createRouter, createWebHistory } from 'vue-router'

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

export default router

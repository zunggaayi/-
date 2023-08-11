<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

// 在vue3路由中
// 要获取路由对象不能用this
// 而是useRouter()
// const router = useRouter()
// 同理，获取路由参数也是
// const route = useRoute()
const router = useRouter()
const route = useRoute()
const golist = () => {
  router.push('/list')
  console.log(router, route)
}

// 使用仓库
const userStore = useUserStore()
</script>

<template>
  <div>
    <hr />
    <router-view></router-view>
    <hr />
    我是App.vue
    <TestCom></TestCom>
    <el-button @click="$router.push('/home')">去首页</el-button>
    <el-button @click="golist">去详情页</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken(114514)">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>

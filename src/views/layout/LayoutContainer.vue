<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  List
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import router from '../../router'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

const handleCommand = (command) => {
  // console.log(command)  // 拿到绑定的选项的command的值
  if (command !== 'logout') {
    router.push(`/user/${command}`)
  } else {
    // 退出，清空本地数据
    ElMessageBox.confirm('您确定要退出登录吗？', '退出登录', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        userStore.setToken('')
        userStore.setUser({})
        router.push('/login')
        ElMessage.warning('您已退出登录')
      })
      .catch(() => {})
  }
}
</script>

<template>
  <div class="common-layout">
    <!-- container容器 -->
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <!-- el-menu 整个菜单
          1.default-active : 配置默认高亮的菜单项，即设置完成，当前路由在哪，哪个选项高亮
            2.router ： 配合一起实现点击跳转（开启路由跳转）
            el-menu-item 菜单项，
            3.index： 后面跟上路由路径，与1配合，当前路由在哪，根index配置的路由相等的项高亮
        -->
        <el-menu
          active-text-color="#ffd04b"
          background-color="#333333"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          text-color="#fff"
          router
        >
          <el-menu-item index="/article/channel">
            <el-icon><Management /></el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/article/manage">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <!-- el-sub-menu多级菜单 -->
          <el-sub-menu index="/user">
            <!-- #title是组件的具名插槽 -->
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item-group title="Personal Center">
              <el-menu-item index="/user/profile">
                <el-icon><List /></el-icon>
                基本资料
              </el-menu-item>
              <el-menu-item index="/user/avatar">
                <el-icon><Crop /></el-icon>
                更换头像
              </el-menu-item>
              <el-menu-item index="/user/password"
                ><el-icon><EditPen /></el-icon>
                重置密码
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            用户名：<strong>{{
              userStore.user.nickname || userStore.user.username
            }}</strong>
          </div>
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <!-- 展示给用户，默认看到的 -->
            <span class="el-dropdown__box">
              <el-avatar :src="userStore.user.user_pic || avatar" />
              <el-icon><CaretBottom /></el-icon>
            </span>

            <!-- 折叠的下拉部分 -->
            <template #dropdown>
              <el-dropdown-menu @command="handleCommand">
                <el-dropdown-item command="profile" :icon="User">
                  基本资料
                </el-dropdown-item>
                <el-dropdown-item command="avatar" :icon="Crop">
                  更换头像
                </el-dropdown-item>
                <el-dropdown-item command="password" :icon="EditPen">
                  重置密码
                </el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer
          ><p class="text">大事件@2023 created by zunggaayi</p></el-footer
        >
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
  background-color: #f0f0f0;
  .el-aside {
    background-color: #333333;
    height: 100vh;
    .logo {
      background: url('@/assets/logo.png') no-repeat center;
      width: 100%;
      height: 20vh;
    }
  }
  .el-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .el-dropdown__box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .el-footer {
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      font-size: 14px;
      color: #666666;
    }
  }
}
</style>

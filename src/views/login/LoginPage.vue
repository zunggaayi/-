<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService } from '@/api/user.js'
const isRegister = ref(false)
const form = ref()

// 表单对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const register = async () => {
  await form.value.validate() // 调用所有校验方法，预校验
  // console.log('开始注册请求')
  // 注意是ref包装的
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功！')
  isRegister.value = true
}
// 规则配置
// 非空校验：required，触发时机：trigger:blur(失焦),change(改变)
// 长度校验：min,max
// 正则校验：pattern:正则规则
// 自定义校验：validator:
// rule:当前校验规则相关信息
// value:当前校验的表单值
// callback：回调，直接callback()，校验成功；callback(new Error('msg'))
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 4,
      max: 10,
      message: '用户名不少于4个字符且不多于10个字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入您要设置的密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符组成',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },

    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          // 注意表单对象是响应式数据，外包了一层对象
          callback(new Error('两次输入的密码不一致'))
        } else callback() // 一定要有callback()，否则提交不了
      },
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <!--  element-ui简介
    1.结构相关
    el-row表示将一行平均分成24份
     el-col表示列：
     （1）:span='12'表示占据12列，即width=50%
     （2）:offset='3'表示偏移量（左），距离左边偏离3列

    el-form表示整个表单
    el-form-item表示表单中的一个区域（一行），表单域

    2.校验相关
    el-form=>
    （1）:model='ruleForm'绑定整个表单数据对象（所有的用户名，密码等信息都在这个对象里）
    （2）:rules='rules'绑定整个rules规则对象
    表单元素=>
    （1）v-model='ruleForm.xxx'  给某个表单元素绑定表单数据对象中的某个属性
    el-form-item=>
    (1)prop配置生效的是哪个规则（与rules中字段对应）
  -->
  <el-row class="loginpage">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录 -->
      <el-form size="large" v-if="isRegister">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入用户名" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-checkbox>记住我</el-checkbox> <a href="#">忘记密码？</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button">登录</el-button>
        </el-form-item>
        <el-form-item>
          <a href="#" @click="isRegister = false">还没有账号？去注册-></a>
        </el-form-item>
      </el-form>
      <!-- 注册 -->
      <!-- 给el-form表单绑定表单数据对象，以及绑定配置规则 -->
      <el-form
        :model="formModel"
        :rules="rules"
        autocomplete="off"
        size="large"
        ref="form"
        v-else
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <!-- v-model来绑定表单数据对象中的某个属性，如果没有绑定，那么在el-input中是不能输入的，因为官方默认绑定数据，没有的话相当于空，且不能输入 -->
          <el-input
            placeholder="请输入用户名"
            :prefix-icon="User"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            :prefix-icon="Lock"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            placeholder="请再次确认密码"
            type="password"
            :prefix-icon="Lock"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" type="primary" class="button"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <a href="#" @click="isRegister = true">已有账号？去登录-></a>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.loginpage {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column; //主轴方向，纵向
    justify-content: center; // 对齐方式，主轴居中
    .flex {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .button {
      width: 100%;
      border-radius: 10px;
      letter-spacing: 5px;
    }
    a {
      text-decoration: none;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>

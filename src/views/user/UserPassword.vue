<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { userSetPasswordService } from '@/api/user.js'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const checkPwd = (rule, value, callback) => {
  if (value !== formModel.value.new_pwd) {
    callback(new Error('两次密码不一致'))
  } else callback()
}
const formRef = ref()
const rules = {
  old_pwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pttern: /^\S{6,15}$/,
      message: '密码必须是6-15位非空字符组成',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: checkPwd, trigger: 'blur' }
  ]
}
const userStore = useUserStore()
const onClear = () => {
  formModel.value.new_pwd = ''
  formModel.value.re_pwd = ''
  formModel.value.old_pwd = ''
}
const onSubmit = async () => {
  await formRef.value.validate()
  await userSetPasswordService(formModel.value)
  ElMessageBox.confirm('修改密码后需要重新登陆', 'WARNING', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('更换密码成功')
    userStore.removeToken()
    userStore.setUser({})
  })
}
</script>
<template>
  <PageContainer title="密码管理">
    <el-form
      :model="formModel"
      style="max-width: 400px"
      label-width="100px"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="旧密码" prop="old_pwd">
        <el-input type="password" v-model="formModel.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input type="password" v-model="formModel.new_pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input type="password" v-model="formModel.re_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
        <el-button @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

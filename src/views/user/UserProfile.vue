<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { ref, watch } from 'vue'
const userStore = useUserStore()
userStore.getUser()
//获取用户信息用于渲染
const formModel = userStore.user
const formRef = ref()
const isEdit = ref(true)
// 默认提交关闭，监听是否修改，开启按钮
watch(formModel, () => {
  isEdit.value = false
})
const onSubmit = async () => {
  await formRef.value.validate()
  userStore.setUser(formModel)
  ElMessage.success('修改成功')
}
const rules = {
  nickname: [
    { required: false },
    {
      pattern: /^\S{3,10}$/,
      message: '昵称必须是3-10位的非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: false },
    // {
    //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
    //   message: '请输入正确的邮箱',
    //   trigger: 'blur'
    // }
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <PageContainer title="个人资料">
    <el-form
      label-width="100px"
      style="max-width: 400px"
      :model="formModel"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="用户名：">
        <el-input disabled :value="formModel.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称：" prop="nickname">
        <el-input v-model="formModel.nickname"></el-input>
      </el-form-item>
      <el-form-item label="个人邮箱：" prop="email">
        <el-input v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="isEdit"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userSetAvatarService } from '@/api/user.js'
import { ref } from 'vue'
const userStore = useUserStore()
const imageUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const isSelect = ref(true)
const onSelect = () => {
  uploadRef.value.$el.querySelector('input').click()
}
const onSelectFile = (uploadFile) => {
  // 基于createObjectURL做图片预览
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
    // console.log(imageUrl.value)
  }
  isSelect.value = false
}

const onSubmit = async () => {
  await userSetAvatarService(imageUrl.value)
  await userStore.getUser()
  ElMessage.success('上传成功')
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      ref="uploadRef"
      :on-change="onSelectFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button type="primary" :icon="Plus" @click="onSelect"
      >选择图片</el-button
    >
    <el-button
      type="success"
      :icon="Upload"
      @click="onSubmit"
      :disabled="isSelect"
      >上传头像</el-button
    >
  </PageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  margin-bottom: 30px;
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      width: 178px;
      height: 178px;
      color: #8c939d;
      text-align: center;
    }
  }
}
</style>

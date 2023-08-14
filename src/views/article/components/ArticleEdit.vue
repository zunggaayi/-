<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import ChannelEdit from './ChannelEdit.vue'
import { Plus } from '@element-plus/icons-vue'
import {
  artAddArticleService,
  artGetDetailService,
  artUpdateService
} from '@/api/article'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'
const visibleDrawer = ref(false)
const imageUrl = ref('')

// 兄弟之间通信需要通过父组件作为桥梁
// 如果第一个组件要向第二个组件发送请求
// 父组件先接收第一个组件的请求
// 然后父组件调用第二个组件暴露的方法来完成请求
const dialog = ref()
const channelList = ref()
const addChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  channelList.value.getList()
}

//默认表单数据，不需要ref响应式
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultForm })
// console.log(formModel.value)
// 基于默认数据
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img
    const file = await imageUrlToFileObject(
      imageUrl.value,
      formModel.value.cover_img
    )
    formModel.value.cover_img = file
  } else {
    formModel.value = {
      ...defaultForm
    }
  }
}

const onSelectFile = (uploadFile) => {
  // 实现本地预览图片
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // 立即将图片对象存入formModel，用于上传
  formModel.value.cover_img = uploadFile.raw
}
//----发布----//
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  // 将普通对象=>formdata对象（接口要求）
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    // 编辑
    await artUpdateService(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await artAddArticleService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

// 将网络图片地址转换为 File 对象的函数
async function imageUrlToFileObject(imageUrl, filename) {
  try {
    // 使用 Axios 下载图片数据
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

    // 将下载的数据转换成 Blob 对象
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })

    // 创建 File 对象
    const file = new File([blob], filename, {
      type: response.headers['content-type']
    })

    return file
  } catch (error) {
    console.error('Error converting image URL to File object:', error)
    return null
  }
}

defineExpose({
  open
})
</script>

<template>
  <!-- :title="formModel.id ? '编辑文章' : '添加文章'" -->
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    size="50%"
  >
    <el-form :model="formModel" style="padding: 30px" ref="formRef">
      <el-form-item label="文章标题" prop="title">
        <el-input
          placeholder="请输入文章标题"
          v-model="formModel.title"
          style="width: 400px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          ref="channelList"
        ></channel-select>
        <el-button type="primary" @click="addChannel" style="margin-left: 20px"
          >添加分类</el-button
        >
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 关闭自动上传，绑定改变时的事件触发 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
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
      width: 100px;
      height: 100px;
      color: #8c939d;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>

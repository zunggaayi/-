<script setup>
import { artGetChannelService, artDeleteChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const isLoading = ref(false)

const channelList = ref([])
const getChannelList = async () => {
  isLoading.value = true
  const res = await artGetChannelService()
  channelList.value = res.data.data
  isLoading.value = false
}
getChannelList()

const addChannel = () => {
  dialog.value.open({})
}

const dialog = ref()
const editChennel = (row) => {
  dialog.value.open(row)
}
const deteleChennel = async (row) => {
  await ElMessageBox.confirm('你确定要删除该分类吗？', 'WARNING', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDeleteChannelService(row.id)
  getChannelList()
  ElMessage.warning('成功删除分类')
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分类</el-button>
    </template>
    <el-table
      :data="channelList"
      stripe
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="类名" />
      <el-table-column prop="cate_alias" label="别名" />
      <el-table-column label="操作" width="100">
        <!-- row是channelList的一项（v-for中的item），index是下表 -->
        <template #default="{ row, $index }">
          <el-button
            @click="editChennel(row, $index)"
            type="primary"
            :icon="Edit"
            circle
            plain
          ></el-button>
          <el-button
            @click="deteleChennel(row, $index)"
            type="danger"
            :icon="Delete"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="No Data" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="getChannelList"></ChannelEdit>
  </page-container>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { artGetArticleService } from '@/api/article'
import { formatTime } from '@/utils/format.js'

// ------渲染相关 -----//
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const articleList = ref([])
const total = ref(0)
const isloading = ref(false)

const getArticleList = async () => {
  isloading.value = true
  const res = await artGetArticleService(params.value)
  // console.log(res.data.data)
  isloading.value = false
  articleList.value = res.data.data
  total.value = res.data.total
}
getArticleList()
//-----搜索和重置-----//
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
//--------分页相关----------//
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 基于最新的每页条数重新渲染，当前页码返回1
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  // 更新当前页
  params.value.pagenum = page
  getArticleList()
}
// ---------抽屉相关---------//
const drawerRef = ref()
const onAddArticle = () => {
  drawerRef.value.open({})
}
const onEditArticle = (row) => {
  drawerRef.value.open(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}
//---重新编辑--
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- v-model是v-model:modelValue的简写，对应的事件是update:modelValue，而:后面的变量是可以自定义的xx，那么接收的时候也是用自定义名字 -->
        <channel-select v-model:cid="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select placeholder="请选择" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="articleList" v-loading="isloading">
      <el-table-column label="文章标题" prop="title">
        <!-- 作用域插槽，拿到数据，自定义填充 -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            circle
            plain
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            type="danger"
            circle
            plain
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 4, 5, 6]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 抽屉 -->
    <article-edit ref="drawerRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

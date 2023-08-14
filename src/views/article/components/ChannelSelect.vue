<script setup>
import { artGetChannelService } from '@/api/article.js'
import { ref } from 'vue'

const channleList = ref([])
const getList = async () => {
  const res = await artGetChannelService()
  channleList.value = res.data.data
}
getList()

defineProps({
  cid: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:cid'])
</script>

<template>
  <el-select
    placeholder="选择文章分类"
    :modelValue="cid"
    @update:modelValue="emit('update:cid', $event)"
  >
    <el-option
      v-for="item in channleList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

<script setup>
// 接收父组件传递过来的数据
// 此处用于自定义组件中的title
// 该组件中用了elementui中的el-card组件，其中<template>中的#header是插槽
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <slot name="extra"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

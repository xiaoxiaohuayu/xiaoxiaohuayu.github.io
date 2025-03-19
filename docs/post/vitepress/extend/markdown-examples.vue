<template>
  <div>{{ text }}</div>
</template>

<script setup lang='ts'>
// #region text
import { ref } from 'vue'
const text = ref('markdown 示例 对应的代码片段')
// #endregion text
</script>

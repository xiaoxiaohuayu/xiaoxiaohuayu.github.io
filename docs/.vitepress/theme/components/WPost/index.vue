<template>
  <div class="VPDoc">
    <div class="vp-doc">
      <div class="container">
        <div class="title">
          <h1>
            全部文章<span> - {{ postLength || '' }} 篇</span>
          </h1>
        </div>
        <div id="post">
          <div  v-if="postLength === 0" class="year-post">
            <div class="year-wrapper">
              <h3 class="year">{{ new Date().getFullYear() }}</h3>
            </div>
            <el-row class="container-row" :gutter="24">
              <el-col v-for="idx of 8" :key="idx" :xs="24" :sm="12" :md="6">
                <weiz-post-card :noData="true" />
              </el-col>
            </el-row>
          </div>
          <div v-else v-for="(year, index) of yearKeys" :key="index" class="year-post">
            <div class="year-wrapper">
              <h3 class="year">{{ year }}</h3>
            </div>
            <el-row class="container-row" :gutter="24">
              <el-col v-for="item of metaPost[year]" :key="item.url" :xs="24" :sm="12" :md="6">
                <weiz-post-card :post="Object.assign({ baseUrl: '../' }, item)" />
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Year, data } from '../../../utils/post.data'

let metaPost = ref<Year>({})
let postLength = ref(0)
let yearKeys = ref<string[]>([])

const getPost = () => {
  metaPost.value = data.years
  postLength.value = data.posts.length
  yearKeys.value = Object.keys(metaPost.value).reverse()
}

onMounted(() => {
  getPost()
})
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: var(--weiz-spacing-8xl);
  h1 span {
    font-size: var(--weiz-font-size-st);
    color: var(--vp-c-text-3);
  }
}
#post {
  .year-wrapper {
    margin: calc(var(--weiz-spacing) * 8) 0 calc(var(--weiz-spacing) * 12) 0;
    height: 1px;
    background: var(--vp-c-text-5);
    position: relative;
  }
  .year {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%) translateY(-50%);
    background: var(--vp-c-bg-soft);
    padding: 0 var(--weiz-spacing-8xl);
    font-size: var(--weiz-font-size-xl);
    font-weight: var(--weiz-font-weight-bold);
    line-height: var(--weiz-text-xl-line-height);
    text-align: center;
  }
  .el-col {
    margin-bottom: var(--weiz-spacing-6xl);
  }
}

</style>

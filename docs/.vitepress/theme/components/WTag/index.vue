<template>
  <div class="VPDoc">
    <div class="vp-doc">
      <div class="container">
        <div id="tags">
          <h1>标签列表</h1>
          <div class="tags-wrapper">
            <div
              v-for="(item, index) of tagsText"
              :key="index"
              @click="activeTag(item)"
              v-bind:class="{ tag: true, 'tag-active': currentTag === item }">
              {{ item }}
              <span class="tag-length">{{ tags[item].length }}</span>
            </div>
          </div>
        </div>
        <div id="posts">
          <div class="title-wrapper">
            <h3 class="title">文章列表</h3>
          </div>
          <div class="posts-wrapper">
            <el-row v-if="posts.length === 0" class="container-row" :gutter="24">
              <el-col v-for="idx of 8" :key="idx" :xs="24" :sm="12" :md="6">
                <weiz-post-card :noData="true" />
              </el-col>
            </el-row>
            <el-row v-else class="container-row" :gutter="24">
              <el-col v-for="item of posts" :key="item.url" :xs="24" :sm="12" :md="6">
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vitepress'
import { Post, data } from '../../../utils/post.data'

const routeData = useRouter()
const tags = ref(data.tags)
const tagsText = ref(Object.keys(tags.value))

let currentTag = ref('')
let posts = ref<Post[]>([])

const activeTag = (tag) => {
  routeData.go(routeData.route.path + '?q=' + encodeURIComponent(tag))
}

// 监听url里参数
const handleUrlState = () => {
  const params = new URLSearchParams(window.location.search)
  let tag = params.get('q') ? decodeURIComponent(params.get('q') as string) : ''
  tag = tagsText.value.indexOf(tag) !== -1 ? tag : tagsText.value[0]
  currentTag.value = tag
  posts.value = tags.value[tag]
}

onMounted(() => {
  handleUrlState()
  window.addEventListener('popstate', handleUrlState)

  const originalReplaceState = history.replaceState;
  history.replaceState = function(state, title, url) {
    originalReplaceState.apply(history, arguments);
    setTimeout(() => {
      handleUrlState()
    })
  };
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handleUrlState)
})
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>

<template>
  <div class="weiz-public">
    <div class="copyright">
      <div class="copyright__author">
        <span class="copyright-meta"> <i class="weiz-icon weiz-icon-user main"></i>文章作者: </span>
        <span class="copyright-info">
          <a :href="siteHref">weizwz</a>
        </span>
      </div>
      <div class="copyright__type">
        <span class="copyright-meta"> <i class="weiz-icon weiz-icon-link main"></i>文章链接: </span>
        <span class="copyright-info">
          <a :href="postHref">{{ postHref }}</a>
        </span>
      </div>
      <div class="copyright__notice">
        <span class="copyright-meta"> <i class="weiz-icon weiz-icon-cc main"></i>版权声明: </span>
        <span class="copyright-info">
          本站文章除特别声明外，均采用
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank">BY-NC-SA 4.0</a>
          许可协议， 转载请注明来自 <a :href="siteHref">{{ theme.siteTitle }}</a
          >！
        </span>
      </div>
      <i class="copyright-symbol weiz-icon weiz-icon-public main"></i>
    </div>
  </div>
  <div class="post-tags">
    <div class="tags-list">
      <a v-for="(item, index) of postTags" :key="index" :href="withBase('/pages/tags?q=' + encodeURIComponent(item))" class="tag">{{
        item
      }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress'
import { onMounted, ref, watch } from 'vue'

const { site, theme, frontmatter } = useData()
const route = useRoute()

const siteHref = ref('')
const postHref = ref('')
const postTags = ref([])

const setHref = () => {
  const domain = window.location.origin
  siteHref.value = domain + site.value.base
  postHref.value = domain + window.location.pathname
  postTags.value = frontmatter.value.tags
}

watch(route, () => {
  setHref()
})

onMounted(() => {
  setHref()
})
</script>

<style lang="scss" scoped>
.weiz-public {
  .copyright {
    position: relative;
    padding: 10px 16px;
    border: solid 1px var(--vp-c-divider);
    border-radius: var(--weiz-border-radius);
    transition: all 0.2s;
    .copyright-symbol {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 20px;
      height: 20px;
    }
    &:hover {
      border-color: var(--weiz-primary-color);
    }
  }
  .copyright-meta {
    color: var(--weiz-primary-color);
    font-weight: bold;
  }
  .copyright-meta i {
    vertical-align: top;
    margin-top: 4px;
    margin-right: 4px;
  }
  .copyright-info {
    padding-left: 6px;
  }
  .copyright-info a {
    text-decoration: underline;
    word-break: break-word;
    color: var(--vp-c-text-6);
    font-weight: 500;
    &:hover {
      color: var(--weiz-primary-color);
      text-decoration: none;
    }
  }
}
.post-tags {
  margin-top: 12px;
  margin-bottom: 44px;
  .tags-list a {
    display: inline-block;
    margin: 8px 8px 8px 0;
    padding: 0 12px;
    line-height: 24px;
    width: fit-content;
    border: 1px solid var(--weiz-primary-color);
    box-sizing: border-box;
    border-radius: 13px;
    color: var(--weiz-primary-color);
    font-size: 0.9em;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: var(--weiz-primary-color);
      color: var(--vp-c-white);
    }
  }
}
</style>

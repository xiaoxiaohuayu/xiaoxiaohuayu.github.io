<template>
  <div class="weiz-title-meta">
    <div class="tags">
      <div class="created" title="发表于">
        <i class="weiz-icon weiz-icon-created gray" />
        <span>发表于 {{ firstCommit }}</span>
      </div>
      <div class="updated" title="更新于">
        <i class="weiz-icon weiz-icon-updated gray" />
        <span>更新于 {{ lastUpdated }}</span>
      </div>
      <div class="word" title="字数总计">
        <i class="weiz-icon weiz-icon-word gray" />
        <span>字数总计 {{ wordCount }}</span>
      </div>
      <div class="reader" title="阅读量">
        <i class="weiz-icon weiz-icon-user gray"></i>
        <span>阅读量 {{ pv }}<span id="busuanzi_value_page_pv" style="display: none" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import { countWord, countTransK, formatDate } from '../../utils/tools'

const { frontmatter } = useData()
const wordCount = ref('')
const firstCommit = ref('')
const lastUpdated = ref('')
const pv = ref('')

let timeoutPV = 0
const getPV = () => {
  if (timeoutPV) clearTimeout(timeoutPV)
  timeoutPV = window.setTimeout(() => {
    const $PV = document.querySelector('#busuanzi_value_page_pv')
    const text = $PV?.innerHTML
    if ($PV && text) {
      pv.value = countTransK(parseInt(text))
    } else {
      getPV()
    }
  }, 500)
}

onMounted(() => {
  const dateOption = formatDate()
  firstCommit.value = dateOption.format(new Date(frontmatter.value.firstCommit!))
  lastUpdated.value = dateOption.format(new Date(frontmatter.value.lastUpdated!))

  const docDomContainer = window.document.querySelector('#VPContent')
  const words = docDomContainer?.querySelector('.content-container .main')?.textContent || ''
  wordCount.value = countTransK(countWord(words))

  getPV()
})
</script>

<style lang="scss" scoped>
.weiz-title-meta {
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 32px;
    color: var(--vp-c-text-2);
    font-weight: 500;
    line-height: 18px;
    word-break: keep-all;
    > div {
      display: flex;
      align-items: center;
      margin-top: 16px;
      margin-right: 6px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .weiz-icon {
    margin-right: 2px;
  }
}

@media (min-width: 768px) {
  .weiz-title-meta .tags > div {
    margin-right: 16px;
  }
}
</style>

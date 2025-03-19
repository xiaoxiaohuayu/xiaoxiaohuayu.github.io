<template>
  <Transition name="fade">
    <div v-show="showBackTop" class="vitepress-backTop-main" title="返回顶部" @click="scrollToTop()">
      <i class="weiz-icon weiz-icon-backTop xxl main" />
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 是否显示返回顶部
const showBackTop = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 节流
const throttle = (fn, delay = 100) => {
  let lastTime = 0
  return function () {
    let nowTime = +new Date()
    if (nowTime - lastTime > delay) {
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}
const onScroll = throttle(() => (showBackTop.value = Boolean(window.scrollY > 100)))

// 监听滚动事件
onMounted(() => window.addEventListener('scroll', onScroll))

// 移除监听事件
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="css" scoped>
.vitepress-backTop-main {
  position: fixed;
  z-index: var(--weiz-index-backTop);
  bottom: 100px;
  right: 0;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0.5em 0.5em -0.25em var(--weiz-primary-color);
  transition: var(--weiz-transition);
  &:hover {
    opacity: 0.8;
  }
  --center-position: calc(32px - 40px / 2);
}

@media (min-width: 768px) {
  .vitepress-backTop-main {
    right: 8px;
  }
}
@media (min-width: 960px) {
  .vitepress-backTop-main {
    right: calc((100vw - 752px) / 2 - 40px);
  }
  .has-sidebar.has-aside .vitepress-backTop-main {
    right: var(--center-position);
  }
}
@media (min-width: 1280px) {
  .has-aside .vitepress-backTop-main {
    right: calc(var(--center-position) + (100vw - 992px) / 2 + 224px);
  }
  .has-sidebar.has-aside .vitepress-backTop-main {
    right: calc(var(--center-position) + 256px);
  }
}
@media (min-width: 1440px) {
  .has-aside .vitepress-backTop-main {
    right: calc(var(--center-position) + (100vw - 1104px) / 2 + 256px);
  }
  .has-sidebar.has-aside .vitepress-backTop-main {
    right: calc(var(--center-position) + 256px + (100vw - var(--vp-layout-max-width)) / 2);
  }
}
</style>

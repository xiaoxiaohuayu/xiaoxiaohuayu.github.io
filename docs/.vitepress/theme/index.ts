import type { Theme } from 'vitepress'
import { EnhanceAppContext, useData, inBrowser, useRouter } from 'vitepress'
import { h, onMounted, onUnmounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import WLoading from './components/WLoading.vue' // 加载动画
import WLayout from './components/WLayout.vue' // 布局
import WPostCard from './components/WPostCard.vue' // 文章小卡片
import WHome from './components/WHome/index.vue' // 首页
import WTag from './components/WTag/index.vue' // 标签页
import WPost from './components/WPost/index.vue' // 所有文章页
import WDocTitleMeta from './components/WDocTitleMeta.vue' //文章顶部

import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client' // type类型悬浮框
import '@shikijs/vitepress-twoslash/style.css'
import busuanzi from 'busuanzi.pure.js' // 卜算子统计插件
import '@fancyapps/ui/dist/fancybox/fancybox.css' 
import { bindFancybox } from './components/ImgViewer'
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条
import 'nprogress-v2/dist/index.css'
// 全局样式
import './style/index.scss'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 为 自定义界面 添加 自定义class */
    props.class = frontmatter.value?.layout || ''

    return h(WLayout, props)
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('weiz-post-card', WPostCard)
    app.component('weiz-home', WHome)
    app.component('weiz-tag', WTag)
    app.component('weiz-post', WPost)
    app.component('weiz-title-meta', WDocTitleMeta)
    app.component('weiz-loading', WLoading)
    app.use(TwoslashFloatingVue)
    app.use(ElementPlus)
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })

      const onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      const onAfterRouteChange = () => {
        NProgress.done() // 停止进度条
        busuanzi.fetch() //卜算子统计
        bindFancybox()
      }
      router.onBeforeRouteChange = onBeforeRouteChange
      router.onAfterRouteChange = onAfterRouteChange
    }
  },
  setup() {
    const router = useRouter()
    onMounted(() => {
      bindFancybox()
    })
    onUnmounted(async () => {
      const { Fancybox } = await import('@fancyapps/ui')
      Fancybox.destroy()
      router.onBeforeRouteChange = undefined
      router.onAfterRouteChange = undefined
    })
  }
} satisfies Theme

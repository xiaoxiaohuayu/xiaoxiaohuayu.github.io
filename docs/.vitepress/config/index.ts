import { defineConfig, loadEnv } from 'vitepress'
import { nav } from './nav'
import { algolia } from './algolia'
import { createHead } from './head'
import { sidebar } from './sidebar'
import { footer } from './footer'
import MarkdownPreview from 'vite-plugin-markdown-preview'
// https://shiki-zh-docs.vercel.app/packages/vitepress
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import addTime from './addTime'

// https://github.com/vuejs/vitepress/discussions/3533
export default async ({ mode }) => {
  const env = loadEnv(mode || '', process.cwd())

  // https://vitepress.dev/zh/reference/site-config
  return defineConfig({
    outDir: '../dist',
    base: env.VITE_APP_BASE_PATH,
    lang: 'zh-CN',
    title: '唯知笔记',
    titleTemplate: ':title - 唯知笔记',
    description:
      '唯知笔记，一个分享编程世界的网站，涵盖前端知识、编码提效、博客文档、资源分享，网站分享等，包含JS、TS、CSS、Markdown、Vue.js、Node.js、Vite、Vitepress、Hexo、Git、Github、Windows、MacOS等相关知识',
    head: createHead(env.VITE_APP_BASE_PATH),
    lastUpdated: true,
    cleanUrls: true,
    // 路由重写
    rewrites: {
      'post/(.*)': '(.*)'
    },
    // 忽略死链查询
    ignoreDeadLinks: true,
    // https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts
    markdown: {
      lineNumbers: true,
      image: {
        lazyLoading: true
      },
      codeCopyButtonTitle: '复制代码',
      codeTransformers: [
        // 使用 `!!code` 和 `<!---@include` 防止转换，演示代码用
        {
          postprocess(code) {
            let _code = code.replace(/\[\!\!code/g, '[!code')
            // 直接替换被浏览器阻止，避免标签注入
            _code = _code.replace(/!---@include/g, '!--@include')
            return _code
          }
        },
        transformerTwoslash()
      ],
      // 对markdown中的内容进行替换或者批量处理
      config: (md) => {
        // 创建 markdown-it 插件
        md.use((md) => {
          // 组件插入h1标题下
          md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
            let htmlResult = slf.renderToken(tokens, idx, options)
            if (tokens[idx].tag === 'h1') htmlResult += `<weiz-title-meta />`
            return htmlResult
          }
          const defaultRender = md.render
          // 2.0.0-alpha.2 允许并接受异步函数 升级到此版本之后或可以使用 docs/.vitepress/utils/fileTime.ts
          md.render = function (...args) {
            // 对原生内容做处理，增加创建时间和更新时间
            args[0] = addTime(args[0], args[1].realPath)
            // 调用原始渲染
            let defaultContent = defaultRender.apply(md, args)
            // 替换内容
            // defaultContent = defaultContent
            //       .replace(/<\!---@include:/g, '<!--@include:')
            // 返回渲染的内容
            return defaultContent
          }
        })
      }
    },

    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
      logo: '/logo.png',
      // 标题隐藏 需设置为false
      siteTitle: '唯知笔记',
      i18nRouting: false,
      nav,
      sidebar,
      footer,
      // 社交按钮
      // socialLinks: [{ icon: 'github', link: 'https://github.com/weizwz/' }],
      //编辑本页
      editLink: {
        pattern: 'https://github.com/weizwz/note/edit/main/docs/:path', // 改成自己的仓库
        text: '在GitHub编辑本页'
      },
      // 相关文字和提示修改
      returnToTopLabel: '回到顶部', // 返回顶部文字修改(移动端)
      sidebarMenuLabel: '菜单', // 侧边菜单
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
      // 大纲显示2-3级标题
      outline: {
        level: [2, 4],
        label: '页面导航'
      },

      lastUpdated: {
        text: '最后更新于',
        formatOptions: {
          dateStyle: 'short',
          timeStyle: 'medium'
        }
      },
      // 自定义上下页名
      docFooter: {
        prev: '上一篇',
        next: '下一篇'
      },
      //本地搜索
      search: {
        provider: 'algolia',
        options: algolia
      }
    },
    // 站点地图
    sitemap: {
      hostname: 'https://note.weizwz.com'
    },
    vite: {
      plugins: [MarkdownPreview()],
      // 解决sass告警的问题 Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern'
          }
        }
      }
    }
  })
}

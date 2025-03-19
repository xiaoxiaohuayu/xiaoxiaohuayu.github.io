import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/terminology/': [
    {
      text: '前端术语',
      items: [
        { text: '设计思想类', link: '/terminology/design-paradigm' },
        { text: '底层运行类', link: '/terminology/low-level-operation' },
      ]
    }
  ],
  '/vitepress/': [
    {
      text: 'VitePress',
      items: [
        {
          text: '基础配置',
          items: [
            { text: '运行时 API', link: '/vitepress/basic/api-examples' }
          ]
        },
        {
          text: '进阶用法',
          items: [
            { text: 'Markdown 示例', link: '/vitepress/extend/markdown-examples' },
          ]
        },
        {
          text: '常见问题',
          items: [
            { text: '渲染报错 Hydration', link: '/vitepress/problem/error-mismatches' },
            { text: 'Sass API 过期告警', link: '/vitepress/problem/warning-sass-api-expired' },
          ]
        },
      ]
    }
  ],
  '/hexo/': [
    {
      text: 'Hexo',
      items: [
        {
          text: '基础配置',
          items: [
            { text: 'GitHub+Hexo搭建博客', link: '/hexo/basic/hexo-github-blog' },
            { text: '博客升级Hexo版本记录', link: '/hexo/basic/hexo-update' },
            { text: 'Hexo命令和优化指南', link: '/hexo/basic/hexo-command-better' },
            { text: 'Hexo常用标签/语法', link: '/hexo/basic/hexo-markdown' },
          ]
        },
        {
          text: '进阶用法',
          items: [
            { text: '首页插件recommend', link: '/hexo/extend/hexo-butterfly-recommend' },
            { text: '导航插件navctrl', link: '/hexo/extend/hexo-butterfly-navctrl' },
            { text: 'Hexo博客新年主题', link: '/hexo/extend/new-year-theme' },
          ]
        }
      ]
    }
  ],
  '/nodejs/': [
    {
      text: 'Node.js',
      items: [
        {
          text: '基础知识',
          items: [
          ]
        },
        {
          text: '日常应用',
          items: [
            { text: 'pnpm配置', link: '/nodejs/apply/pnpm-setting' },
          ]
        },
        {
          text: '常见问题',
          items: [
            { text: 'Nodejs报错记录', link: '/nodejs/problem/error-log' },
          ]
        },
      ]
    }
  ],
  '/vuejs/': [
    {
      text: 'Vue.js',
      items: [
        {
          text: '基础知识',
          items: [
            { text: 'Vue双向绑定原理', link: '/vuejs/basic/vue-mvvm-binding' },
            { text: 'Vue3.5常用特性整理', link: '/vuejs/basic/vue3.5-new' },
          ]
        },
        {
          text: '日常应用',
          items: [
            { text: 'Vue多界面开发', link: '/vuejs/apply/vue-multi-page-dev' },
            { text: 'Vue3中使用echarts', link: '/vuejs/apply/vue3-ts-echarts' },
            { text: 'Vue3部署到GitHub', link: '/vuejs/apply/vue3-apply-github-page' },
          ]
        },
        {
          text: '项目搭建: Vite4+TS',
          items: [
            { text: '1. 项目初始化', link: '/vuejs/apply/project-building-vite-ts-1' },
            { text: '2. TS配置', link: '/vuejs/apply/project-building-vite-ts-2' },
            { text: '3. Vite配置', link: '/vuejs/apply/project-building-vite-ts-3' },
            { text: '4. 代码规范', link: '/vuejs/apply/project-building-vite-ts-4' },
            { text: '5. 路由router', link: '/vuejs/apply/project-building-vite-ts-5' },
            { text: '6. 状态管理pina', link: '/vuejs/apply/project-building-vite-ts-6' },
            { text: '7. 请求封装axios', link: '/vuejs/apply/project-building-vite-ts-7' },
          ]
        },
      ]
    }
  ],
  '/js/': [
    {
      text: 'JavaScript',
      items: [
        {
          text: '基础知识',
          items: [
          ]
        },
        {
          text: '日常应用',
          items: [
            { text: 'JS比较数值大小', link: '/js/apply/compare-number' },
            { text: 'JS判断点是否在线段上', link: '/js/apply/point-in-line' },
          ]
        },
      ]
    }
  ],
  '/ts/': [
    {
      text: 'TypeSCript',
      items: [
        {
          text: '基础知识',
          items: [
            { text: '常用TS总结', link: '/ts/basic/ts-normal-summary' },
          ]
        },
        {
          text: '日常应用',
          items: [
            { text: 'JS批量处理TS数据类型', link: '/ts/apply/js-batch-conversion-ts' },
          ]
        },
      ]
    }
  ],
  '/css/': [
    {
      text: 'CSS',
      items: [
        {
          text: '基础知识',
          items: [
          ]
        },
        {
          text: '实用特效',
          items: [
            { text: 'Github项目徽标', link: '/css/apply/icon-label-shields' },
            { text: 'mask创建纯CSS图标库', link: '/css/apply/mask-svg-icon' },
            { text: '龙年特效', link: '/css/apply/loong-effects' },
          ]
        },
      ]
    }
  ],
  '/editor/': [
    {
      text: '开发工具',
      items: [
        {
          text: 'VSCode',
          items: [
            { text: '自用 VSCode 插件', link: '/editor/vscode/vscode-self-plugin' },
            { text: '接入DeepSeek V3', link: '/editor/vscode/vscode-deepseek' },
            { text: '接入硅基流动的 API', link: '/editor/vscode/vscode-siliconflow' },
          ]
        },
      ]
    }
  ],
  '/resource/': [
    {
      text: '资源分享',
      items: [
        {
          text: '字体',
          items: [
            { text: '开源字体整理', link: '/resource/font/open-source-font' },
          ]
        },
        {
          text: '图片图标',
          items: [
          ]
        },
      ]
    }
  ],
  '/browser/': [
    {
      text: '浏览器',
      items: [
        {
          text: '相关知识',
          items: [
          ]
        },
        {
          text: '配置和优化',
          items: [
            { text: '浏览器插件分享', link: '/browser/apply/browser-plugin' },
          ]
        },
      ]
    }
  ],
  '/windows/': [
    {
      text: 'Windows系统',
      items: [
        {
          text: '系统配置', 
          items: [
            { text: 'cmd终极美化', link: '/windows/setting/terminal-beautify' },
            { text: '开发环境备份', link: '/windows/setting/dev-env-back' },
            { text: '配置linux命令', link: '/windows/setting/cygwin-to-linux-command' },
          ]
        },
        {
          text: '应用推荐',
          items: [
          ]
        },
      ]
    }
  ],
  '/macos/': [
    {
      text: 'MacOS系统',
      items: [
        {
          text: '系统配置', 
          items: [
            { text: '原生终端美化', link: '/macos/setting/mac-terminal-beautify' },
            { text: '黑苹果记录', link: '/macos/setting/black-apple-log' },
            { text: '定制清爽Edge', link: '/macos/setting/clear-edge' },
          ]
        },
        {
          text: '应用推荐',
          items: [
            { text: '自动点击器', link: '/macos/app/free-auto-mouse-click' },
          ]
        },
      ]
    }
  ],
  '/mobile/': [
    {
      text: '移动端开发',
      items: [
        {
          text: 'uni-app',
          items: [
            { text: 'uniapp+vue3项目搭建', link: '/mobile/uniapp/project-building-uniapp-vue3' },
            { text: 'uniapp+vue3问题总结', link: '/mobile/uniapp/important-point-uniapp-vue3' },
          ]
        },
        {
          text: 'oppo手机', 
          items: [
            { text: 'oppo组件开发调试', link: '/mobile/oppo/oppo-component-debugging' },
            { text: 'oppo组件自适应', link: '/mobile/oppo/oppo-component-auto' },
          ]
        },
      ]
    }
  ],
  '/app/': [
    {
      text: '应用分享',
      items: [
        {
          text: '网络应用',
          items: [
            { text: 'Clash Verge', link: '/app/network/clash-verge' },
          ]
        },
        {
          text: '图像应用', 
          items: [
            { text: '截图工具pixpin', link: '/app/image/screenshot-pixpin' },
          ]
        },
      ]
    }
  ],
  '/git/': [
    {
      text: 'Git',
      items: [
        { text: 'Git使用记录', link: '/git/use-log' }
      ]
    }
  ],
  '/site/': [
    {
      text: '网站管理',
      items: [
        { text: '网站设置三级域名', link: '/site/third-level-domain' }
      ]
    }
  ],
  '/nginx/': [
    {
      text: 'Nginx',
      items: [
        { text: 'Nginx解决跨域访问', link: '/nginx/nginx-web-cross-domain' },
      ]
    }
  ],
  '/element/': [
    {
      text: 'Element UI',
      items: [
        { text: 'Element自适应布局', link: '/element/responsive-layout' }
      ]
    }
  ],
  '/ai/': [
    {
      text: 'AI应用',
      items: [
        { text: 'AI本地作画', link: 'ai/ai-local-painting' }
      ]
    }
  ],
}
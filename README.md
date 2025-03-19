# 笔记

一个基于 `VitePress` 的网站，存放简历、资料。

## 搭建和基本配置

参考文档

[唯知笔记](https://note.weizwz.com/)

[VitePress 官方文档](https://vitepress.dev/zh/guide/getting-started)

[yx - VitePress 快速搭建个人博客](https://lyxdream.github.io/note/vitePress-blog/index)

[Yiov - VitePress 快速上手](https://vitepress.yiov.top/getting-started.html)

## 说明

### 目录

- `.github` 存放部署脚本 `/workflows/main.yml`
- `.vscode` 编辑器相关目录：存放写作模板 `.vscode/markdown.code-snippets` 以及 vue3 模板 `.vscode/vue3.code-snippets`
- `docs/.vitepress/config` 存放 `vitepress` 配置
- `docs/.vitepress/theme` 存放 主题配置，以及自定义插件
- `docs/.vitepress/utils` 存放 工具类，包括收集文章信息，处理日期格式等
- `docs/pages` 存放博客主页面，如 全部文章、标签列表、更新日志等
- `docs/post` 作为正式文档目录，其内的 `.md` 文档都将作为正式文档被渲染，除了以 '-demo.md' 结尾的文档（作为正式文档的示例文档，不会出现在文章目录）

  > 文档过滤方法，参见 `docs/.vitepress/utils/post.data.ts`
  > line 35，过滤规则
  > `post/**/!(*-demo).md`

- `docs/post` 目录，经过路由重写后，文章链接里去掉了 `/post`

  ```ts
  // .vitePress/config/index.ts
  rewrites: {
    'post/(.*)': '(.*)',
  },
  ```

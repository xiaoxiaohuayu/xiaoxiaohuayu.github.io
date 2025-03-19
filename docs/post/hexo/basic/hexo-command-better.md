---
title: Hexo 常用命令和优化指南
description: 这篇文章详细介绍了Hexo的常用命令，包括初始化网站、创建新文章、生成静态文件、启动本地服务器、部署网站等。通过这些命令，用户可以高效地管理和维护Hexo网站，提高网站的性能和可定制性
firstCommit: 2022-09-15 11:55:23+8:00
lastUpdated: 2024-03-15 10:39:35+8:00
tags:
  - Hexo
  - Markdown
  - VSCode
---

# Hexo 常用命令和优化指南

> 之前博客使用的是 `Hexo`框架 + `Butterfly`主题。本文记录了在使用 `Hexo` 过程中常用的命令和对博客进行优化的方案 💕

## 快速开始

### 创建新文章

详情查看: [Writing](https://hexo.io/zh-cn/docs/writing.html)

```sh
$ hexo new "My New Post"
```

### 运行服务

详情查看: [Server](https://hexo.io/zh-cn/docs/server.html)

```sh
$ hexo server
```

### 上传 `algolia` 搜索内容

```sh
$ hexo algolia
```

### 生成静态文件

详情查看: [Generating](https://hexo.io/zh-cn/docs/generating.html)

```sh
$ hexo generate
```

### 清除缓存

详情查看: [Deployment](https://hexo.io/zh-cn/docs/commands.html#clean)

```sh
$ hexo clean
```

### 部署

详情查看: [Deployment](https://hexo.io/zh-cn/docs/one-command-deployment.html)

```sh
$ hexo deploy
```

### 上传到 `github` 并部署

```sh
$ hexo g -d
```

### 升级 `hexo-theme-butterfly`

详情查看: [博客升级 - hexo记录](/hexo/basic/hexo-update)

```sh
$ npm update hexo-theme-butterfly
```

## 博客优化

### 首页 `Banner` 和推荐

![image](https://www.helloimg.com/i/2024/12/30/6772c27e978a8.png)

使用了插件 `hexo-butterfly-recommend`，详情查看我的博客 [hexo-butterfly-recommend 使用说明](/hexo/extend/hexo-butterfly-recommend)

### 导航栏控制中心

![image](https://www.helloimg.com/i/2024/12/31/6772c8ef052f0.gif)

使用了插件 `hexo-butterfly-navctrl`，详情查看我的博客 [hexo-butterfly-navctrl 使用说明](/hexo/extend/hexo-butterfly-navctrl)

### 页脚徽标

![image](https://www.helloimg.com/i/2024/12/31/6772cd0feb868.png)

修改 `_config.butterfly.yml` 中的配置项 `footer`，详情查看我的博客 [Github项目徽标](/css/apply/icon-label-shields) 最后的 `实际应用` -> `博客页脚`

### 图片预加载动画

![image](https://www.helloimg.com/i/2024/11/23/67419a987ba2f.gif)

修改 `_config.butterfly.yml` 中的配置项 `lazyload`:

```yml
lazyload:
  enable: true
  field: site # site/post
  placeholder: /img/loading.gif
  blur: false
```

分享我的 `loading` 动画 [loading.io - weizwz](https://loading.io/asset/708622)，可自定义修改文字、字体、颜色、动画速度等。

## 其他

### 使用 `vscode` 预览博客时显示本地图片

![images](https://www.helloimg.com/i/2024/12/31/6773ad13d47de.png)

本地博客中的本地图片地址一般为 `/img/xxx`，省略了本地目录的 `soucre` 文件夹，博客部署时会把所有文件夹都部署在根目录（本地图片 `/source/img/xxx`，服务端 `/img/xxx`），显示正常，但是本地预览则找不到此路径，所以预览时会显示不出来。
如果你使用vscode的话，可以推荐此方案：
安装 `Markdown Preview Enhanced` 插件，运行 `Markdown Preview Enhanced: Extend Parser` 命令，会打开 `parser.js` 文件（详情查看此 [文档](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/extend-parser)），做以下修改，保存后则本地图片预览正常（需要使用 `Markdown Preview Enhanced` 插件预览博客，而非 `vscode` 自带）。

```js
;({
  // Please visit the URL below for more information:
  // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

  onWillParseMarkdown: async function (markdown) {
    // 替换hexo本地图片地址
    markdown = markdown.replace(/\/img\/blog\//g, '/source/img/blog/')
    return markdown
  },

  onDidParseMarkdown: async function (html) {
    return html
  },

  onWillTransformMarkdown: async function (markdown) {
    return markdown
  },

  onDidTransformMarkdown: async function (markdown) {
    return markdown
  }
})
```

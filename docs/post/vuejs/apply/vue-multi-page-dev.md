---
title: Vue 多界面开发
description: 这篇文章介绍了如何使用 Vue CLI 创建多页面应用。文章详细讲解了安装 Vue CLI、创建项目、修改多页面配置、运行项目查看效果等步骤，并提供了相应的代码示例和配置文件修改方法。
firstCommit: 2022-11-19 21:00:37+8:00
lastUpdated: 2022-11-19 21:00:37+8:00
tags:
  - Vue.js
  - Vue-CLI
---

# Vue 多界面开发

> 在现代前端开发中，创建多页面应用已成为一种常见需求。Vue CLI 作为一个强大的工具，可以帮助开发者轻松实现这一目标。

本文将详细介绍如何使用 Vue CLI 创建多页面应用，包括安装 Vue CLI、创建项目、修改多页面配置以及运行项目查看效果等步骤

### 1. 安装 `vue-cli`，已有的请跳过这一步

```bash
npm install -g @vue/cli
```

若已安装旧版 `vue-cli` 则需要先卸载 `vue-cli`

```bash
npm uninstall -g vue-cli
```

### 2. 创建项目

```bash
vue create project-name
// 提示
Vue CLI v5.0.8
? Please pick a preset: (Use arrow keys)
> Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
  Manually select features
// 选择vue2，稍等一会提示创建成功，如下
🎉  Successfully created project demo.
👉  Get started with the following commands:

 $ cd demo
 $ npm run serve
```

创建成功后，目录如下：
![image](https://www.helloimg.com/i/2024/12/31/6773c4341985d.jpg)

### 3. 修改多界面配置

参考 [官方文档](https://cli.vuejs.org/zh/config/#pages)。
修改 `vue.config.js` 文件，在 `pages` 里增加界面

```js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/about.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `about.html`。
    about: 'src/page/about/main.js'
  }
})
```

如上，我们也需要增加对应的文件。在 `src` 目录下，新建 `page` 文件夹，在其下面继续新建 `about` 文件夹，在 `about` 下新建对应的 `main.js` 和 `App.js`。
在 `public` 目录下，新建 `about.html`。
**提示：**

- `about` 文件夹下的 `App.js` 和 `main.js` 均可复制首页对应的同名文件，稍作修改即可。复制之后，记得修改里面的引用地址。
- 首页 `App.js` 里可以增加指向 `about` 界面的连接 `<p><a href="/about">go to about</a></p>`，`about` 文件夹下的 `App.js` 里增加指向首页的连接 `<p><a href="/">go to home</a></p>`，这样可以查看跳转效果。

### 4. 运行项目查看界面

```bash
npm run serve
```

查看效果
![image](https://www.helloimg.com/i/2024/12/31/6773c4335a528.gif)

### 5. 其他

**具体可参考我的项目 [mulitpage](https://github.com/weizwz/mulitpage)。**

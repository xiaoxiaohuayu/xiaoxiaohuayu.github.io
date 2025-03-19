---
title: hexo-butterfly-navctrl 使用说明
description: 这篇文章介绍了Hexo主题Butterfly的导航栏控制插件hexo-butterfly-navctrl的使用方法。内容包括插件的安装、配置和功能展示，帮助用户在博客中实现更灵活的导航栏控制，提高博客的可用性和用户体验
firstCommit: 2023-12-15 16:42:25+8:00
lastUpdated: 2023-12-19 17:23:54+8:00
tags:
  - Hexo
  - npm
---

# hexo-butterfly-navctrl 使用说明

> 没错，这次又整活了，起因是看到了一个漂亮的换肤效果，然后应用到自己的博客上，结果发现单纯的js不太好控制原有的换肤控制效果，所以又开始做插件，结果做着做着就...不如整个控制中心，功能更多，于是 [hexo-butterfly-navctrl](https://github.com/weizwz/hexo-butterfly-navctrl) 应运而生。

`hexo-butterfly-navctrl` 是基于 `hexo-theme-butterfly` 主题的扩展插件，主要功能是提供导航栏的快捷控制。

## 效果展示

动图太大，加载不易，如果你想体验效果，也可直接点击导航栏右侧的 `显示模式切` 换按钮
![image](https://www.helloimg.com/i/2024/12/31/6772c8ef052f0.gif)

## 安装

```sh
npm i hexo-butterfly-navctrl --save
```

## 升级

```sh
npm update hexo-butterfly-navctrl --save
```

## 使用

在 `_config.butterfly.yml` 里找到 `darkmode`，开启暗黑模式，关闭黑暗模式的按钮

```yml
# dark mode
darkmode:
  enable: true # 设置为true
  button: false # 设置为false
```

将以下配置添加到 `_config.butterfly.yml` 或 `_config.yml`。

```yml
navctrl:
  enable: true # 开关
  priority: 10 # 过滤器优先权 默认10，值越低过滤器越早执行
  layout: # 挂载容器类型
    type: id
    name: nav # 容器名称
    index: 1 # 如果是class，取第几个
  menu: # 如果不想要哪个菜单，注释掉即可
    display: '' # 默认文字+图标; txt 仅文字; icon 仅图标
    dark: '显示模式 || fas fa-adjust'
    random: '随便逛逛 || fas fa-paper-plane'
    link: # 添加链接，支持多个
      # - '我的博客 || fas fa-blog || https://weizwz.com/'
      # - '关注我 || fas fa-brands fa-github || https://github.com/weizwz'
```

重启后生效

## 内置方法

和 `hexo-butterfly-recommend` 类似，也公开了部分方法，可以在你的js里引用。前提是注意它的加载时机，配置里 `priority` 数值的设置可以更小点。

```js
// 跳转指定文章  href为文章链接，譬如 window.navctrl.toPost('posts/7db60965.html')
window.navctrl.toPost(href)
// 跳转随机文章
window.navctrl.toRandomPost()
```

## 其他问题

### 1. 图标

参考 [hexo-butterfly-recommend使用说明](/hexo/extend/hexo-butterfly-recommend#_1-图标问题) 里的 `图标问题`，都是一样的

### 2. 样式问题

如果有样式兼容问题，您可以自行引入 `css` 文件，强行覆盖即可。

### 3. 黑暗切换动画的原理

效果查看 https://weizwz.com/fun-animation/page/funDark.html
打开后右键 `查看页面源代码`，主要是动态设置css全局变量，然后利用动画以及 `clip-path` 属性。

### 4. 其余问题

请到 [hexo-butterfly-navctrl](https://github.com/weizwz/hexo-butterfly-navctrl) 上提 `issues`。

## 更新日志

### 1.0.3

- 修复过滤器未生效
- 修复文章随机跳转的问题

### 1.0.2

有bug，撤销处理

### 1.0.1

- 新增支持自定义链接功能 link
- 新增只显示图标还是文字的选项 display
- 优化移动端的图标显示

### 1.0.0

正式发布

- 黑暗模式切换
- 随便逛逛

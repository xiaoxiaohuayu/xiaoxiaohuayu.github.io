---
title: 巧用 mask 属性创建一个纯 CSS 图标库
description: 本文介绍了如何使用CSS的mask属性和SVG图像创建一个纯CSS图标库。通过将SVG图标转换为data URI并在CSS中使用mask属性，可以实现图标的颜色和尺寸控制。文章详细讲解了图标库的创建步骤，包括SVG图标的定义、公共样式设置、多种颜色和尺寸的应用
lastUpdated: 2025-01-03 12:10:23+8:00
tags:
  - CSS
  - SVG
  - 图标
---

# 巧用 mask 属性创建一个纯 CSS 图标库

> [!NOTE] 简介
> [`mask`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask) 是CSS中的一个属性，它允许开发者在元素上设置图像作为遮罩层。这个属性的强大之处，在于它可以接受多种类型的值，包括关键字值、图像值、渐变色，甚至可以设置多个属性值。
>
> [`SVG`](https://developer.mozilla.org/zh-CN/docs/Web/SVG)（Scalable Vector Graphics，可缩放矢量图形）是一种基于 XML 的图像格式，用于定义二维图形。与传统的位图图像（如 PNG 和 JPG）不同，SVG 图像是矢量图形，可以在任何尺寸下保持清晰度，不会失真。

我们将 SVG 代码转换为 `data URI`，然后在 CSS 中使用，这样我们可以避免多个 HTTP 请求；另一方面，我们使用 `mask` 来设置 SVG 来作为元素蒙版的图像，然后通过设置元素的 `background-color` 就可以控制 SVG 显示的颜色。

通过以上两个要素结合，我们就可以创建一个纯CSS图标库：它能通过只设置 `class name`，就让元素显示出相对应的图标和颜色。

## 创建图标库

### 1. 将svg图标对应到class

这里需要注意的是：

1. 要确保我们的 SVG 图标是单色的
2. 使用 CSS 变量存储 SVG，有便于减少我们的代码，毕竟 `mask` 是一个现代浏览器才支持的属性，需要我们设置不同浏览器前缀

```css
.weiz-icon-web {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cg fill='none'%3E%3Crect width='40' height='32' x='4' y='8' stroke='%23000' stroke-linejoin='round' stroke-width='4' rx='3'/%3E%3Cpath stroke='%23000' stroke-width='4' d='M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4z'/%3E%3Ccircle r='2' fill='%23000' transform='matrix(0 -1 -1 0 10 14)'/%3E%3Ccircle r='2' fill='%23000' transform='matrix(0 -1 -1 0 16 14)'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-code {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2zm1.657 10L14.12 8.464L12.707 9.88L14.828 12l-2.12 2.121l1.413 1.415zM6.343 12l3.536 3.536l1.414-1.415L9.172 12l2.12-2.121L9.88 8.464z'/%3E%3C/svg%3E");
}
/*其他的省略，可根据需要自行添加*/
```

### 2. 设置公共样式

利用变量来存储颜色，后续我们可以利用修改变量的值来控制图标的颜色

```css
:root {
  --weiz-icon-color: #3c3c43;
}
.weiz-icon {
  display: inline-block;
  background-color: var(--weiz-icon-color);
  width: 16px;
  height: 16px;
  mask: var(--url) no-repeat center center;
  -webkit-mask: var(--url) no-repeat center center;
  mask-size: cover;
  -webkit-mask-size: cover;
}
```

### 3. 设置多种颜色

```css
.weiz-icon.main {
  --weiz-icon-color: var(--weiz-primary-color);
}
.weiz-icon.white {
  --weiz-icon-color: #ffffff;
}
.weiz-icon.gray {
  --weiz-icon-color: #3c3c43c7;
}
/* 暗黑模式下自动适应 */
.dark {
  --weiz-icon-color: #fffff5db;
  .weiz-icon.gray {
    --weiz-icon-color: #ebebf599;
  }
}
```

### 4. 设置多种尺寸

```css
.weiz-icon.m {
  width: 12px;
  height: 12px;
}
.weiz-icon.l {
  width: 24px;
  height: 24px;
}
.weiz-icon.xl {
  width: 32px;
  height: 32px;
}
.weiz-icon.xxl {
  width: 40px;
  height: 40px;
}
.weiz-icon.xxxl {
  width: 48px;
  height: 48px;
}
```

## 扩展

推荐一个 SVG 图标网站：[icon-sets.iconify.design](https://icon-sets.iconify.design/?query=home)。找到自己想要的图标后，点击图标，选择下方的 URL 复制即可。

![icon-sets.iconify.design](https://www.helloimg.com/i/2024/12/23/676977dcdbb3a.png)

## 应用

```html
<i class="weiz-icon weiz-icon-web l white"></i>
```

效果如图：

![image-20241223221217819.png](https://www.helloimg.com/i/2024/12/23/676973df31305.png)

真实案例请查看：[唯知笔记](https://note.weizwz.com/)

## 分享

在这里也分享下当前网站所用的所有标签图标：

```css
.weiz-icon-post {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M19 2.01H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.998 5 19.815 5 19.01q0-.15.024-.273c.112-.575.583-.717.987-.727H20c.018 0 .031-.009.049-.01H21V4.01c0-1.103-.897-2-2-2m0 14H5v-11c0-.806.55-.988 1-1h7v7l2-1l2 1v-7h2z'/%3E%3C/svg%3E");
}
.weiz-icon-js,
.weiz-icon-javascript {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Crect width='16.5' height='16.5' x='3.75' y='3.75' rx='2'/%3E%3Cpath d='M11.5 11.25v5a1 1 0 0 1-1 1H9m8.25-6h-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-ts,
.weiz-icon-typescript {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Crect width='16.5' height='16.5' x='3.75' y='3.75' rx='2'/%3E%3Cpath d='M17.25 11.25h-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2m-4.75-6v6m-2-6h4'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-node,
.weiz-icon-nodejs {
  --url: url(https://api.iconify.design/la/node.svg?color=%23000);
}
.weiz-icon-css {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='M3.75 5.25a1.5 1.5 0 0 1 1.5-1.5h11.5a3.5 3.5 0 0 1 3.5 3.5v9.5a3.5 3.5 0 0 1-3.5 3.5h-9.5a3.5 3.5 0 0 1-3.5-3.5z'/%3E%3Cpath d='M9.25 17.25h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1m4 0h-1a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1v0a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1h-1m6-5h-1a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1v0a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1h-1'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-vue,
.weiz-icon-vuejs {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M14.5 3L12 7.156L9.857 3H2l10 18L22 3zM4.486 4.5h2.4L12 13.8l5.107-9.3h2.4L12 18.021z'/%3E%3C/svg%3E");
}
.weiz-icon-blog {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M8 21h8a5 5 0 0 0 5-5v-3a3 3 0 0 0-3-3h-1V8a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5'/%3E%3Cpath d='M7 8.5A1.5 1.5 0 0 1 8.5 7h3A1.5 1.5 0 0 1 13 8.5v0a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 7 8.5m0 7A1.5 1.5 0 0 1 8.5 14h7a1.5 1.5 0 0 1 1.5 1.5v0a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 15.5'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-vite {
  --url: url(https://api.iconify.design/lineicons/vite.svg?color=%23000);
}
.weiz-icon-vitepress {
  --url: url(https://api.iconify.design/simple-icons/vitepress.svg?color=%23000);
}
.weiz-icon-hexo {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19.875 6.27c.7.398 1.13 1.143 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98zM9 8v8m6-8v8m-6-4h6'/%3E%3C/svg%3E");
}
.weiz-icon-npm {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-width='1.5'%3E%3Cpath stroke-linejoin='round' d='M1 8h22v7H11v2H7.5v-2H1zm6.5 0v7m6-7v7'/%3E%3Cpath d='M18 11v4M5 11v4m6-4v1m9.5-1v4'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-git {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='M12 10a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0 8a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m4.25-3.75a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 10v5M8.25 4.75L10.5 7m2.75 2.75l1.5 1.5'/%3E%3Cpath d='M11.576 1.424a.6.6 0 0 1 .848 0l10.152 10.152a.6.6 0 0 1 0 .848L12.424 22.576a.6.6 0 0 1-.848 0L1.424 12.424a.6.6 0 0 1 0-.848z'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-markdown {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 20v-8l-4 4l-4-4v8m12-3.5l3.5 3.5m0 0l3.5-3.5M22.5 20v-9M5 7h22a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2'/%3E%3C/svg%3E");
}
.weiz-icon-site {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' d='M14.5 8A6.5 6.5 0 0 1 8 14.5M14.5 8A6.5 6.5 0 0 0 8 1.5M14.5 8c0 1.657-2.91 3-6.5 3S1.5 9.657 1.5 8m13 0c0-1.657-2.91-3-6.5-3S1.5 6.343 1.5 8M8 14.5A6.5 6.5 0 0 1 1.5 8M8 14.5c1.657 0 3-2.91 3-6.5S9.657 1.5 8 1.5m0 13c-1.657 0-3-2.91-3-6.5s1.343-6.5 3-6.5M1.5 8A6.5 6.5 0 0 1 8 1.5'/%3E%3C/svg%3E");
}
.weiz-icon-element {
  --url: url(https://api.iconify.design/ep/element-plus.svg?color=%23000);
}
.weiz-icon-font {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M15.5 7.5h-2.75v9h.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5h.5v-9H8.5v.75a.75.75 0 1 1-1.5 0v-1.5A.75.75 0 0 1 7.75 6h8.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0zM5.75 3A3.75 3.75 0 0 0 2 6.75v10.5A3.75 3.75 0 0 0 5.75 21h12.5A3.75 3.75 0 0 0 22 17.25V6.75A3.75 3.75 0 0 0 18.25 3zM3.5 6.75A2.25 2.25 0 0 1 5.75 4.5h12.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H5.75a2.25 2.25 0 0 1-2.25-2.25z'/%3E%3C/svg%3E");
}
.weiz-icon-browser {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='m10.992 20.946l4.122-7.146M4.755 6.654L8.886 13.8m11.367-5.4H12m0 7.2a3.6 3.6 0 1 0 0-7.2a3.6 3.6 0 0 0 0 7.2'/%3E%3Cpath d='M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-vscode {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' d='M10.5 11L3 4.5h-.5l-1 1V6l9 8.5l4-2v-9l-4-2v13m0-13L5.3 6.41M3.53 8.08L1.5 10v.5l.98 1.1l.52-.1l2.17-1.88m1.91-1.66L10.5 5'/%3E%3C/svg%3E");
}
.weiz-icon-ai {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M14 3v4a1 1 0 0 0 1 1h4'/%3E%3Cpath d='M10 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v4'/%3E%3Cpath d='M14 21v-4a2 2 0 1 1 4 0v4m-4-2h4m3-4v6'/%3E%3C/g%3E%3C/svg%3E");
}
.weiz-icon-windows {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='none' stroke='%23000' stroke-linejoin='round' stroke-width='3' d='m6.75 11.063l12.938-1.725v12.075H6.75zm18.112-2.218L41.25 6.75v14.663H24.862zm0 18.605l16.388.383V41.25l-16.388-2.683zM6.75 26.588l12.938.311V37.8L6.75 35.62z'/%3E%3C/svg%3E");
}
.weiz-icon-macos {
  --url: url(https://api.iconify.design/proicons/apple.svg?color=%23000);
}
.weiz-icon-oppo {
  --url: url(https://api.iconify.design/simple-icons/oppo.svg?color=%23000);
}
.weiz-icon-nginx {
  --url: url(https://api.iconify.design/devicon/nginx.svg?color=%23000);
}
.weiz-icon-app {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%23000' d='M28 10h-6v14h2v-4h4a2.003 2.003 0 0 0 2-2v-6a2 2 0 0 0-2-2m-4 8v-6h4v6zm-6-8h-6v14h2v-4h4a2.003 2.003 0 0 0 2-2v-6a2 2 0 0 0-2-2m-4 8v-6h4v6zm-6-8H3v2h5v2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v-8a2 2 0 0 0-2-2m0 8H4v-2h4z'/%3E%3C/svg%3E");
}
.weiz-icon-proxy {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 20h.012M8.25 17c2-2 5.5-2 7.5 0m2.75-3c-3.768-3.333-9-3.333-13 0M2 11c3.158-2.667 6.579-4 10-4m3 .5s1 0 2 2c0 0 2.477-3.9 5-5.5' color='%23000'/%3E%3C/svg%3E");
}
.weiz-icon-image {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3M6 5h12a1 1 0 0 1 1 1v8.36l-3.2-2.73a2.77 2.77 0 0 0-3.52 0L5 17.7V6a1 1 0 0 1 1-1m12 14H6.56l7-5.84a.78.78 0 0 1 .93 0L19 17v1a1 1 0 0 1-1 1'/%3E%3Ccircle cx='8' cy='8.5' r='1.5' fill='%23000'/%3E%3C/svg%3E");
}
.weiz-icon-command {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6.75 7.5l3 2.25l-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25'/%3E%3C/svg%3E");
}
.weiz-icon-echarts {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5l3 3L17.273 7L20 9.667'/%3E%3C/svg%3E");
}
.weiz-icon-uni-app {
  --url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0'/%3E%3Cpath d='M9 8v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8'/%3E%3C/g%3E%3C/svg%3E");
}
```

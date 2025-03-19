---
title: 让你的博客一起过年
description: 这篇文章介绍了如何通过修改Hexo和Butterfly主题的配置文件来为博客添加新年灯笼效果。文章详细描述了修改配置文件、添加CSS样式和创建新插件的方法，旨在为博客增添节日气氛
firstCommit: 2023-01-10 20:37:59+8:00
lastUpdated: 2023-01-11 21:23:09+8:00
tags:
  - Hexo
  - CSS
---

# 让你的博客一起过年

> 马上就要过年了，看着我这毫无生气的博客，感觉有点亏待它。博客过年，马上安排！
> 本博客基于 `hexo` 和主题 `Butterfly` 修改。

## 先上预览图

![images](https://www.helloimg.com/i/2025/01/02/6776498080354.jpg)

![images](https://www.helloimg.com/i/2025/01/02/6776496a9ce34.jpg)

## 修改`Butterfly`配置文件

修改文件 `_config.butterfly.yml`
修改主页图片

```yml
index_img: /img/banner/lantern_banner.png
default_top_img: /img/banner/lantern_banner.png
```

修改背景色

```yml
background: '#fff6f6'
```

修改主题色

```yml
theme_color:
  enable: true
  main: '#ff0000'
  paginator: '#ff0000'
  button_hover: '#fb5050'
  text_selection: '#fb5050'
  toc_color: '#fb5050'
  blockquote_padding_color: '#ff0000'
  blockquote_background_color: '#ff0000'
  scrollbar_color: '#ff0000'
```

## 修改配置之外的颜色

在 `souce` 文件夹下新建文件夹 `css`，然后新建css文件 `myTheme.css`。此文件主要是对主题配置之外的颜色做处理。
文件内容如下：

```css
@charset 'utf-8';

:root {
  /* --main-color: #1e9fff; */
  --main-color: #ff0000;
  --main-color-hover: #fb5050;
  --main: var(--btn-bg);
  --button_hover: var(--text-bg-hover);
  --box-shadow-color: rgba(7, 17, 27, 0.05);
  --hr-border: var(--main-color);
  --hr-before-color: var(--main-color);
  --card-box-shadow: 0 3px 8px 6px var(--box-shadow-color);
  --box-shadow-color: rgba(255, 0, 0, 0.05);
  --card-hover-box-shadow: 0 3px 8px 6px rgba(255, 0, 0, 0.09);
  --global-bg: #fff6f6;
  /* code */
  --hl-bg: #fff2f2;
  --hltools-bg: #ffd4d4;
}
/*封面遮罩层*/
#page-header:not(.not-top-img):before {
  /* background-color: rgba(0,0,0,0.3); */
  background-color: rgba(255, 0, 0, 0.3);
}
/* 公告 */
#aside-content .card-info .card-info-social-icons i {
  color: var(--main-color);
}
#aside-content .card-info .card-info-social-icons i:hover {
  color: var(--main-color-hover);
}
#aside-content .fa-solid,
#aside-content .fas {
  color: var(--main-color);
}
/* -------------- code -------------- */
#article-container a {
  color: var(--main-color);
}
/* -------------- 评论 -------------- */
#post-comment .comment-head #comment-switch .switch-btn {
  background: var(--main-color);
}
#post-comment .comment-head #comment-switch .first-comment {
  color: var(--main-color);
}
.comment-headline > .fas {
  color: var(--main-color);
}
.vpower > a {
  color: var(--main-color) !important;
}
```

如果有其他遗漏的样式，可自行添加。
然后在配置文件 `_config.butterfly.yml` 里引入此css。

```yml
inject:
  head:
    - <link rel="stylesheet" href="/css/myTheme.css">
```

## 新增摇曳的灯笼

### 新建 `plug`

在 `BlogRoot/node_modules/hexo-theme-butterfly/layout/includes` 文件夹下新建 `lantern.pug`，文件内容如下：

```yml
.lantern-box
.lantern
.lantern-line
.lantern-main
.lantern-rect
.lantern-text='欢'
.lantern-tassel.lantern-tassel-top
.lantern-tassel-bottom
.lantern-tassel-middle
.lantern-box.lantern-box1
.lantern
.lantern-line
.lantern-main
.lantern-rect
.lantern-text='度'
.lantern-tassel.lantern-tassel-top
.lantern-tassel-bottom
.lantern-tassel-middle
.lantern-box.lantern-box2
.lantern
.lantern-line
.lantern-main
.lantern-rect
.lantern-text='春'
.lantern-tassel.lantern-tassel-top
.lantern-tassel-bottom
.lantern-tassel-middle
.lantern-box.lantern-box3
.lantern
.lantern-line
.lantern-main
.lantern-rect
.lantern-text='节'
.lantern-tassel.lantern-tassel-top
.lantern-tassel-bottom
.lantern-tassel-middle
```

### 引入 `plug`

在 `BlogRoot/node_modules/hexo-theme-butterfly/layout/includes/layout.pug` 中引入 `lantern.pug`。
如下图：
![image](https://www.helloimg.com/i/2025/01/01/6774b652a94ee.png)

### 新增 `css`

直接在之前新建的 `myTheme` 文件里最后新增灯笼的样式代码，如下：

```css
/* --- 过年灯笼 --- */
:root {
  --lantern-bg: rgba(255, 0, 0, 0.8);
  --lantern-text-color: #ffc14e;
  --lantern-line-color: #ffa500;
}
.lantern-box {
  position: fixed;
  top: -10px;
  left: 0px;
  max-width: 200px;
  z-index: 1999;
}

.lantern-box1 {
  top: -20px;
  left: 80px;
}

.lantern-box2 {
  top: 0px;
  left: 160px;
}

.lantern-box3 {
  top: -10px;
  left: 240px;
}

.lantern-box1 .lantern,
.lantern-box3 .lantern {
  animation: swing 5s infinite ease-in-out;
  animation: swing 5s infinite ease-in-out;
  box-shadow: -5px 5px 30px 4px rgba(252, 144, 61, 1);
}

.lantern {
  position: relative;
  width: 120px;
  height: 90px;
  margin: 50px;
  background: var(--lantern-bg);
  border-radius: 50% 50%;
  transform-origin: 50% -100px;
  animation: swing 3s infinite ease-in-out;
  animation: swing 3s infinite ease-in-out;
  box-shadow: -5px 5px 50px 4px rgba(250, 108, 0, 1);
}

.lantern-main {
  width: 95px;
  height: 90px;
  margin: 12px 8px 8px 10px;
  border-radius: 50% 50%;
  border: 2px solid var(--lantern-line-color);
}

.lantern-rect {
  width: 45px;
  height: 90px;
  background: #d8000f;
  background: rgba(216, 0, 15, 0.1);
  margin: -4px 8px 8px 26px;
  border-radius: 50% 50%;
  border: 2px solid var(--lantern-line-color);
}

.lantern-line {
  position: absolute;
  top: -60px;
  left: 60px;
  width: 2px;
  height: 60px;
  background: var(--lantern-line-color);
}

.lantern-tassel-top {
  position: relative;
  width: 5px;
  height: 20px;
  margin: -5px 0 0 59px;
  animation: swing 4s infinite ease-in-out;
  transform-origin: 50% -45px;
  background: var(--lantern-line-color);
  border-radius: 0 0 5px 5px;
}

.lantern-tassel-middle {
  position: absolute;
  top: 14px;
  left: -2px;
  width: 10px;
  height: 10px;
  background: #dc8f03;
  border-radius: 50%;
}

.lantern-tassel-bottom {
  position: absolute;
  top: 18px;
  left: -2px;
  width: 10px;
  height: 35px;
  background: var(--lantern-line-color);
  border-radius: 0 0 0 5px;
}

.lantern:before {
  position: absolute;
  top: -7px;
  left: 29px;
  height: 12px;
  width: 60px;
  content: ' ';
  display: block;
  z-index: 1999;
  border-radius: 5px 5px 0 0;
  border: solid 1px #dc8f03;
  background: var(--lantern-line-color);
  background: linear-gradient(to right, #ffa500, #ffc14e, #ffa500, #ffc14e, #ffa500);
}

.lantern:after {
  position: absolute;
  bottom: -7px;
  left: 10px;
  height: 12px;
  width: 60px;
  content: ' ';
  display: block;
  margin-left: 20px;
  border-radius: 0 0 5px 5px;
  border: solid 1px #dc8f03;
  background: var(--lantern-line-color);
  background: linear-gradient(to right, #ffa500, #ffc14e, #ffa500, #ffc14e, #ffa500);
}

.lantern-text {
  font-family:
    华文行楷,
    楷体,
    Arial,
    Lucida Grande,
    Tahoma,
    sans-serif;
  font-size: 2.8rem;
  color: var(--lantern-text-color);
  font-weight: bold;
  line-height: 90px;
  text-align: center;
}

.night .lantern-text,
.night .lantern-box {
  background: transparent !important;
}

@keyframes swing {
  0% {
    transform: rotate(-10deg);
  }

  50% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(-10deg);
  }
}

@-moz-keyframes swing {
  0% {
    -moz-transform: rotate(-10deg);
  }

  50% {
    -moz-transform: rotate(10deg);
  }

  100% {
    -moz-transform: rotate(-10deg);
  }
}

@-webkit-keyframes swing {
  0% {
    -webkit-transform: rotate(-10deg);
  }

  50% {
    -webkit-transform: rotate(10deg);
  }

  100% {
    -webkit-transform: rotate(-10deg);
  }
}
```

然后重启预览重新发布即可。

> 提示：如果发布后样式未生效，记得先 `hexo clean`，然后再发布

**和博客一起过年，祝大家新年快乐！**

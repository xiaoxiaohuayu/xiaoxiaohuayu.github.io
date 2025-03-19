---
title: hexo-butterfly-recommend 使用说明
description: 这篇文章介绍了Hexo主题Butterfly的推荐组件扩展 hexo-butterfly-recommend。内容包括如何安装和配置此组件，以提升博客的功能和美观度。通过使用此组件，用户可以在博客首页添加滚动Banner、文章推荐卡片等，增强用户体验
firstCommit: 2023-11-22 16:34:55+8:00
lastUpdated: 2024-02-01 19:12:14+8:00
tags:
  - Hexo
  - npm
---

# hexo-butterfly-recommend 使用说明

> [hexo-butterfly-recommend](https://github.com/weizwz/hexo-butterfly-recommend) 是基于 [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 主题的扩展插件，主要给博客首页添加导航和推荐功能

## 龙年特效版

### 效果展示

![image](https://www.helloimg.com/i/2024/12/30/6772c20577dec.png)
![image](https://www.helloimg.com/i/2024/12/30/6772c2056df68.png)

### 龙年动画详解

想要做自定义修改的或者其他地方集成的，可参考此文档 [你想要的龙年特效来了](/css/apply/loong-effects)

### 配置说明

- 修改 `post` 字段下的内容，`cover.enable` 关闭则直接显示次级推荐页，开启则默认显示推荐主页，鼠标放上去显示次级推荐页。
- 当 `paths` 下的文章足够 6 个时，不会有文字卡片特效，不足或者没有时，才会出现文字卡片。
- 特效 `龙` 的出现前提是次级推荐页数量不足 6 个，且 `paths_completion.type=text` 且 `paths_completion.text`的内容里含有单独的文字 `龙`。`龙` 的位置，取决于它在 `paths_completion.text` 里的位置。
- 其余设置项 `text_bg,text_color`等有默认值，无需填写，如果你要单独配置的话，可以自行设置。

```yml
post:
  cover: #默认推荐页
    enable: true #开关，关闭的话，path，img等无需再配置；开启了但后续无其他配置，默认取最新一篇文章
    path: '2023/11/20/butterfly-recommend使用说明' #推荐界面访问路径 也可设置分类页，需要其余配置都齐全
    img: '/img/cover_default.png' #可为空，默认取cover，没有的话在取 top_img。最前面的/不可省略
    title: 'butterfly-recommend 正式发布了' #推荐标题，不填的话取文章标题
    subTitle: '首屏新组件' #推荐次标题，不填的话取文章时间
  paths: #次级推荐页 填博文访问路径
    # - '2023/11/20/butterfly-recommend使用说明'
    # - '2023/11/19/test-post'
    # - '2023/11/21/Hexo-是什么'
    # - '2023/11/19/hello-world'
    # - '2023/11/21/如何开发hexo扩展插件'
    # - '2023/11/21/Copilot-with-Bing-Chat'
  paths_completion: #次级推荐页补全，当 paths 不足6个时自动生效
    type: 'text' #值为'posts' 或者 'random' 或者 'text'
    text: '祝君龙年大吉，龙福齐天,龙兴大运，生意兴龙,龙,龙腾虎跃，龙光焕发,龙体安康，生龙活虎,龙华富贵，万事兴龙' #当 type 为 text 时生效。以,号分隔，取前6个。有单独的龙字时出现特效
    # text_bg: 'rgba(254, 38, 33,.8),rgba(255, 187, 106, .8)' #文字背景渐变，建议有透明色，最多支持2个，以,号分隔
    # text_color: '#ffbb6a' #文字颜色
    # twelve_color: '#fd091b,#ffa731' #生肖图案渐变色，最多支持2个，当 text 中含有单独生肖文字时，此配置生效
```

## 效果展示

`默认`

![image](https://www.helloimg.com/i/2024/12/30/6772c27e978a8.png)

`屏幕宽度 <= 1200`

![image](https://www.helloimg.com/i/2024/12/30/6772c2671c8e6.png)

`移动端`

<image style="display: inline-block; margin-right: 10%;" src="https://www.helloimg.com/i/2024/12/30/6772c25c7d4a8.png" alt="移动端效果图片1"/>
<image style="display: inline-block;" src="https://www.helloimg.com/i/2024/12/30/6772c25c52b01.png" alt="移动端效果图片2"/>

## 安装

```sh
npm i hexo-butterfly-recommend --save
```

## 升级

```sh
npm update hexo-butterfly-recommend --save
```

## 配置

将以下配置添加到 `_config.butterfly.yml` 或 `_config.yml` 文件中。

```yml
recommend:
  enable: true #开关
  color: #非必选 主题色，有两个．第二个是随机逛逛的背景色，要有透明度，也可是rgab的形式，比如： '#409eff,rgba(0, 117, 255, .8)'
    - '#409eff'
    - '#0075ffdd'
  priority: 5 #过滤器优先权 默认10，值越低过滤器越早执行
  enable_page: / #应用页面 /是首页，all所有界面，/categories分类页等
  exclude: #屏蔽页面，可以多个，用,号分隔。仅当enable_page为'all'时生效。
  layout: #挂载容器类型
    type: id
    name: content-inner #容器名称
    index: 1 #如果是class，取第几个
  banner: #banner
    title:
      - '无限热爱'
      - '生活与技术'
      - 'WEIZWZ.COM'
    skill: #技能树  fontawesome图标 https://fontawesome.com/search?o=r&m=free&f=brands
      - name: 'Html'
        icon: 'fa-brands fa-html5'
        color: '#fff'
        background: '#e9572b'
      - name: 'Css'
        icon: 'fa-brands fa-css3-alt'
        color: '#fff'
        background: '#2c51db'
      - name: 'Sass'
        icon: 'fa-brands fa-sass'
        color: '#fff'
        background: '#ca6496'
      - name: 'Bootstrap'
        icon: 'fa-brands fa-bootstrap'
        color: '#fff'
        background: '#563e7c'
      - name: 'Js'
        icon: 'fa-brands fa-js'
        color: '#fff'
        background: '#f7cb4f'
      - name: 'Vue'
        icon: 'fa-brands fa-vuejs'
        color: '#fff'
        background: '#42b883'
      - name: 'Angular'
        icon: 'fa-brands fa-angular'
        color: '#fff'
        background: '#bd0102'
      - name: 'Node'
        icon: 'fa-brands fa-node'
        color: '#7dbd05'
        background: '#37322e'
      - name: 'Git'
        icon: 'fa-brands fa-git-alt'
        color: '#fff'
        background: '#df5b40'
  category:
    - name: '必看精选'
      path: 'categories/精选'
      icon: 'fa-solid fa-star' #fontawesome图标
      color: #渐变色
        - '#358bff'
        - '#15c6ff'
    - name: '热门文章'
      path: 'categories/热门'
      icon: 'fa-solid fa-fire'
      color:
        - '#f65'
        - '#ffbf37'
    - name: '优质资源'
      path: 'categories/资源'
      icon: 'fa-solid fa-gem'
      color:
        - '#18e7ae'
        - '#1eebeb'
  post:
    cover: #默认推荐页
      enable: true #开关，关闭的话，path，img等无需再配置；开启了但后续无其他配置，默认取最新一篇文章
      path: '2023/11/20/butterfly-recommend使用说明' #推荐界面访问路径 也可设置分类页，需要其余配置都齐全
      img: '/img/cover_default.png' #可为空，默认取cover，没有的话在取 top_img。最前面的/不可省略
      title: 'butterfly-recommend 正式发布了' #推荐标题，不填的话取文章标题
      subTitle: '首屏新组件' #推荐次标题，不填的话取文章时间
    paths: #次级推荐页 填博文访问路径
      # - '2023/11/20/butterfly-recommend使用说明'
      # - '2023/11/19/test-post'
      # - '2023/11/21/Hexo-是什么'
      # - '2023/11/19/hello-world'
      # - '2023/11/21/如何开发hexo扩展插件'
      # - '2023/11/21/Copilot-with-Bing-Chat'
    paths_completion: #次级推荐页补全，当 paths 不足6个时自动生效
      type: 'text' #值为'posts' 或者 'random' 或者 'text'
      text: '祝君龙年大吉，龙福齐天,龙兴大运，生意兴龙,龙,龙腾虎跃，龙光焕发,龙体安康，生龙活虎,龙华富贵，万事兴龙' #当 type 为 text 时生效。以,号分隔，取前6个。有单独的龙字时出现特效
      # text_bg: 'rgba(254, 38, 33,.8),rgba(255, 187, 106, .8)' #文字背景渐变，建议有透明色，最多支持2个，以,号分隔
      # text_color: '#ffbb6a' #文字颜色
      # twelve_color: '#fd091b,#ffa731' #生肖图案渐变色，最多支持2个，当 text 中含有单独生肖文字时，此配置生效
```

## 内置方法

从 `hexo-butterfly-recommend ^1.0.2` 版本起，`recommend` 对象绑定在了 `window` 里，使得对外暴露，可以在你的 js 里使用。

```js
// 跳转指定文章  href为文章链接，譬如 window.recommend.toPost('posts/7db60965.html')
window.recommend.toPost(href)
// 跳转随机文章
window.recommend.toRandomPost()
// 使界面元素横向滚动(界面宽度小于等于1200px时) dom为界面元素
window.recommend.postScroll(dom)
```

示例：

```js
// 首页第一篇文章添加横向滚动（横向内容未超出界面，则不会滚动），这将导致竖向滚动不生效
function scrolling() {
  window.recommend.postScroll(document.querySelector('.recent-post-item'))
}
document.querySelector('.recent-post-item').addEventListener('mousewheel', scrolling, false)
```

## 其他

### 1. 图标问题

此插件基于 `hexo-theme-butterfly` 4.10.0 版本，所以图标也是基于 `Font Awesome Free 6.4.2`。
如果您使用的 `hexo-theme-butterfly` 版本较低，部分图标可能展示不全，您可以自行引入 `Font Awesome` 高版本；
还有一种方案，引入其他字体图标库，包括 `iconfont`，然后修改对应图标的 `class` 名（即配置项中的 `icon`）即可。示例：

```yml
tag_plugins:
  enable: true # 开关
  CDN:
    iconfont: /js/ali_font.js #参看 https://butterfly.js.org/posts/4073eda/?highlight=iconfont#iconfont
inject:
  head:
    # 引入字体图标 iconfont
    - <link rel="stylesheet" href="https://at.alicdn.com/xxxxx.css">
# 中间省略
recommend:
  skill: #技能树  fontawesome图标 https://fontawesome.com/search?o=r&m=free&f=brands
    - name: 'Js'
      icon: 'iconfont icon-logo-javascript'
      color: '#fff'
      background: '#f7cb4f'
    - name: 'Ts'
      icon: 'iconfont icon-ts'
      color: '#fff'
      background: '#0288d1'
```

### 2. 样式问题

如果有样式兼容问题，您可以自行引入 `css` 文件，强行覆盖即可。

### 3. 其余问题

请到 [hexo-butterfly-recommend](https://github.com/weizwz/hexo-butterfly-recommend) 上提 `issues`。

## 更新日志

### 1.1.2 bug修复

- 修复文字卡片自定义渐变色未生效
- 修复暗色模式下龙的背景黑色显示的问题

### 1.1.1 龙年特效优化

- 优化云朵流动动画
- 优化小屏端首个推荐页的展示
- 修复龙特效在移动端遮挡导航栏的bug

### 1.1.0 龙年特效

- 新增龙年特效，详情查看配置字段 `paths_completion`
- 优化推荐文章补全机制
- bug 修复：开启文章推荐后未配置导致启动报错

### 1.0.3 推荐页优化

- 新增默认推荐页开关 post.enable
- 新增主题可选配置 color
- 适配黑暗模式
- 优化默认推荐页不设置的时候日期显示的问题
- 修复：侧边栏设置居左的时候导致界面布局错乱
- 修复：网络不佳时组件继续生成的问题(开启了 pjax)

### 1.0.2 代码优化

- 压缩代码
- 增加推荐页动画
- 代码优化，样式统一(颜色和间距都设置 css 统一变量,可在你的 css 里强行覆盖)
- 去除控制台打印信息

### 1.0.1 bug修复

- 修复二级推荐页面图片显示被压缩的问题
- 修复过滤器优先权不生效的问题

### 1.0.0 发布

正式发布

- 技能树循环
- 分类展示
- 推荐封面
- 二级推荐

---
title: Github 项目徽标
description: 这篇文章介绍了如何在GitHub项目中使用shields.io生成各种漂亮的徽标。内容包括徽标的基本模板、样式、图标和动态数据的使用方法。通过这些步骤，用户可以为自己的项目添加自定义徽标，提升项目的专业性和美观度
firstCommit: 2023-12-06 19:49:11+8:00
lastUpdated: 2023-12-14 17:23:10+8:00
tags:
  - CSS
  - Github
  - Markdown
  - Hexo
---

# Github 项目徽标

> [shields.io](https://shields.io/) 上提供了各种漂亮的徽标，支持文字、颜色、图标以及各种动静态数据

## 效果展示

[![image](https://img.shields.io/badge/Hello%20word-8A2BE2?style=for-the-badge)](https://img.shields.io/badge/Hello%20word-8A2BE2?style=for-the-badge)

[![image](https://img.shields.io/npm/v/vue)](https://img.shields.io/npm/v/vue)

[![image](https://img.shields.io/github/stars/vueuse/vueuse?style=social)](https://img.shields.io/github/stars/vueuse/vueuse?style=social)

## 使用详解

### 1. 各种格式的基本模板

::: code-group

```[URL]
https://img.shields.io/badge/:badgeContent
```

```md [Markdown]
![Static Badge](https://img.shields.io/badge/:badgeContent)
```

```rSt [rSt]
.. image:: https://img.shields.io/badge/:badgeContent
   :alt: Static Badge
```

```AsciiDoc [AsciiDoc]
image:https://img.shields.io/badge/:badgeContent[Static Badge]
```

```html [HTML]
<img alt="Static Badge" src="https://img.shields.io/badge/:badgeContent" />
```

:::

### 2. `badgeContent` 的基本构成

其中style和logo/自定义图标是组合形式

```
# 仅文字 标题可省略
https://img.shields.io/badge/{标题}-{内容}-{颜色}

# 添加style
# 值: flat(默认,圆角), flat-square(方角), plastic(塑性/立体), for-the-badge(方角,扁平,字母变大写), social(社交形式)
https://img.shields.io/badge/{标题}-{内容}-{颜色}?style={style}

# 添加logo logo名称在线查找 https://simpleicons.org/
https://img.shields.io/badge/{标题}-{内容}-{颜色}?logo={logo名称}&logoColor={log颜色}

# 自定义图标 图标需要转换为base64编码
https://img.shields.io/badge/{标题}-{内容}-{颜色}?logo={base64编码}

# 动态数据 支持的API查看官方文档 https://shields.io/badges/github-gist-stars
https://img.shields.io/badge/{api}
```

## 实例拆解

> 点击徽章可直接查看url

### 1. 基本徽标

空格用 `%20` 表示

[![image](https://img.shields.io/badge/Hello%20Weizwz-8A2BE2?style=plastic)](https://img.shields.io/badge/Hello%20Weizwz-8A2BE2?style=plastic)

```
https://img.shields.io/badge/Hello%20Weizwz-409eff?style=plastic
```

### 2. 带logo徽标

logo在线查找 https://simpleicons.org/

[![image](https://img.shields.io/badge/logo-javascript-blue?logo=javascript&logoColor=f7cb4f)](https://img.shields.io/badge/logo-javascript-blue?logo=javascript&logoColor=f7cb4f)

```
https://img.shields.io/badge/Language-javascript-blue?logo=javascript&logoColor=f7cb4f
```

### 3. 自定义图标徽标

推荐 https://www.iconfont.cn/ 下载png格式图标（下载之前可以设置颜色），然后转换base64编码 https://c.runoob.com/front-end/59/

[![image](https://img.shields.io/badge/image-circle-4bb2ff?style=for-the-badge&logo=data:image/png;base64,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)](https://img.shields.io/badge/image-circle-4bb2ff?style=for-the-badge&logo=data:image/png;base64,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)

```
https://img.shields.io/badge/image-circle-4bb2ff?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAC8VJREFUeF7tnYuR3TYMRclKEldibyWxK/GmEm8qybqSbCpRBrL0IunpQ1IUCRFHM/b6Q4nkBc4AIPXxjuMyBbqu+905J78+TzqRv8ux9VP+72PSfvzz8t/+Hdp9eO+n/3fZfCxe2FucdM45DxDIJb84534bfo5/z9nV3rVGQN6HRj8FHu/9+PdS42iuHwCJNOkAxB/Daa+Rp9doLvAIKALNO9EmzgQAcqDXAMQYHb5OUqM4pfW0fgDjvX/TMyydIwGQFbtMooSAIb9aPkZg/iIlezYzgAyaTKBoIUqkAi2wSFQRWCj8nXOmATEWKWKhEUD+tJ6GmQRkAsYdiuxYx87d3nTNYgqQruu+O+csp1Bn4elTMO/9n2cvdJfzTQACGNnd0QwoTQMygEEalZ2PxwWbB6U5QKgvrqNh58rNgtIUIESMKnBMO20OlCYAGaLGDwObetUJCByAgPKthY3HWwNCOhXorvWavd59xeu2gJBO1fP6yJ5vnXbdDhDSqUj31NNcQHm52y0stwKEqKHH2xNHcrtocgtAiBqJ7qj3NHk+RYp49TdEqgek6zq53fxvvbZmZIkK3OJmSNWAkFIlut59TlOfcqkEhJTqPh6eaaRqC3h1gJBSZXK5+11GZcqlChDguJ9XZx6xupRLDSBd18lzGnK7CAcKqNmBVwEIxThErCigApLqgHRdJ1FDogcHCiwVqA5JVUC6rpP9jdZfq4Pbn1NAHvH9du4S6WdXAYRl3HSDGT1TXqP6qcbcawFC5Khh7Xv3WQWS4oCQVt3bSyuPvjgkRQEBjsru1Ub3RWuSYoAARxveqWQWxSApAghLuUrcqq1hFFkCvhwQdsjb8kpls7kckksB4d4qZe7U5nAuheQyQICjTW9UOKtLXzF0CSDDRuA/CsVkSG0qcNnzJFcBwkZgm46oeVby/cWX3APMDgh35uY2EdeLUCB7PZIVEOqOCFPS9AoFstcjuQHprpg110SBCAWy1iPZAGGnPMKENL1agWz1SBZAqDuutjfXT1AgSz1yGhDqjgTTcUoJBbLUIzkAYUm3hLnpI0WB07fHnwKE+6xSbMY5hRWQdwC/pfZ5FhBWrVKV57xSCpyKIsmAcAt7KfvSTwYFkp8fSQKEwjyDybhEaQXk4z3y2YWoIxUQCvMomWmsQIGkVCsaEApzBaZmCKkKRO+NpABCYZ5qHs6rrUB0FIkChB3z2val/wwKRBXssYAQPTJYiEtUVSAqigQDQu1R1ah0nleB4M3DGEDkEdrf846Tq6FAFQWCo0gQIESPKkak02sVCIoioYAQPa41Flcvr0BQFDkEhOhR3nL0WEyBwygSAgjRo5i96KiwAodRZBcQokdhc9FdDQV279E6AoTvB9YwGX2WVGD3+fUjQNgYLGkq+qqhwG6atQkI6VUNW9FnJQU2i/U9QLilvZK16La4Aptp1h4gpFfF7USHFRVYLdZXASG9qmgmuq6lwOqzIluAsPdRy0z0W0uB1WL9CRCiRy370K8CBZ7SrDVA2PtQYCmGUEWBpzRrDRDSqyq2oVMFCjylWWuAsHqlwFIMoZoCn7z38l7f/pgBQv1RzSh0rEeBWR2yBIT6Q4+hGEkdBWYvdVgCQv1Rxyj0qkeBWR2yBIT6Q4+hGEk9BR5p1gMQ6o961qBndQqsAkL9oc5ODKiSAo+bF6cRhPqjkjXoVp0CjzpkCgj1hzo7MaBaCnjvezb63/jeRy0z0K9iBfo6ZATkq3NOahAOFECBXwr0TxmOgHx3zr2iDAqgwEOB/sbFERBWsPAMFJgr0K9kjYCwgoV7oMBcgX4lawSEFSzcAwXWAOm6Tj5pIBGEAwVQYK7AJ88tJvgECmwq8AIgeAcKbCvwKoCwxIuLoMC6Aj0gLPHiHigAIPgACkQr8EYEidaMEwwp8C6A8JJqQxZnqlEKAEiUXDS2pkAPCLeZWDM78w1V4ANAQqWinUUFAMSi1ZlzsAI9INyoGKwXDa0pACDWLM58oxSgBomSi8bWFAAQaxZnvjEK9DUIG4UxktHWkgIAYsnazDVaAXbSoyXjBEsKAIglazPXaAW4mzdaMk6wpEAPCE8UWjI5c41RAEBi1KKtOQV4Jt2cyZlwjALfJMX64pyTvRAOFECBuQI9ILw4DrdAgXUFePUonoECWwrIR3TGd/Nyuwl+ggJzBWYvrwYQ3AMF5gq8ee+/8QEd3AIF1hWYfUCHlSzcBAWWK1iTT7ABCO6BAnMFPnnvP8YUi6Ve3AMFtgCRf+fBKfwDBf5XYPaddADBNVBgpkC/giX/0qdYAyDUIXgJCvxSoP9G+hIQ6hDcAwV+KdAX6DNASLPwDRT4pcBYf6wBwsNTeIl1BR71xxog1CHW3YP5P+qPNUCoQ3AQ6wo86o8nQKhDrPuG+fm/e+9fpio8lnnHf+QlDuadxLIAs/pjK4JQh1h2Edtzf/Hev+9GENIs2x5iefbT5d1Rh6cUawCE5V7LnmJz7rPVqyNAWM2y6SSWZz1bvdoFhDTLsp+YnPtTcR4CyFfn3A+TcjFpawqsplerq1iT5V7SLGtuYnS+a8X5YQQhzTLqLfamvZle7UaQARD2ROw5jLUZP+19HO6DLNIsqUMEFA4UaE2B/uVwe5Na3QeZntB1HcV6a27BfEYFNovzoBpkSLOkWCeK4FTNKbBXnAcDMkBCFGnOPcxP6DB6HBbpi1pE3t8r0YQDBW6vQEj0CAaEKHJ7f2ACcwWCokcsIGwc4mZNKBAaPaIAIYo04RtMwrn+re2hQhwu804vxOfaQmWlnVYFYqJHdAQhimg1O+MKVCC49hivFxVBBkDYFwm0Bs1UKfD0QoaQ0UUDMoHkn5AOaIMCShTYvedqa4xJgAyQyO66bCByoIB2BXbv2N0b/BlAJNVi81C7azC+2bt2Y+VIBoSCPVZq2ldSILown47zFCADJHxCupLl6fZQgaTCPDcg7LAf2okGlRRIKsyzAjJEEd6jVckD6HZTgagd8+yrWMsL8hFQXFWRAqdTq3Eup2uQ8ULDbSisainyEqNDOXyMNkaXbIAMqRYveYhRn7ZXKHC67sheg0wvyOcTrrA51wxUIEvdcTUg3KsVaE2aZVUgW91xKSBDqsUue1bbc7EDBbLWHZcDQj2CQxdWIGvdUQSQARLehlLYUwx2dxkcomXWVaw141C0G3TZclM+dZ9VyDAvB2SIJOy0h1iDNjEKZF+xWuu8CCBAEmN32gYocMmKVW1AZGVLIgkPWQV4AE02FSgGR5EaZDrN4XYU3vOL96cqUBSO4oAMqRZ7JKnuYfu8y/Y69mQtVoMQSWx798nZF48c43irADKJJH84515PisfpbStQDY4qKdZKJAGSth38zOyS30ZyptPpudUiyAIU9klyWbSd61SHo3oEAZJ2vDnzTC7fIQ8dr4oIMg6W7yGGmq3pdpfeWxWrnCpAWAaONV9T7T+ccxI53jXNSh0gE0jYddfkKdeOpepK1d7UVALCMvC13qjs6kVuOkyds1pAJnUJO++p1tV9nsqUaimZekCIJrq9PHF0alOqWwIyiSbslyR6pKLTVKdUtwZkEk24I1iRxwcORVIqWcKVn7c5bpFirak5PMorz5ZIjcKhVwEBQnbFg78sq2kqtwWE2kSTG22O5Vbp1Nosbg3IYqWLtEsPM7dYoQqRqwlAiCYhpi7S5tbpVLMRZDqx4bFebqEvwsOjk+bAGGfWTARZ+sMEFAr562BpFozmAVnUJxJRACUfKM2DYQaQBSjy/RLZbGRpOA0WM2CYA2QFlM+8oyuYEnlvwL/e+7fgMxpp2GwNEmKfoU6RqCIpmPzk+F8Bc9HCxCpWqodPinoBxSosPRTOub/udktIqt2PzjMdQbbEMQbLCMVPbU/zHTlvif8HkAOVJ2mY1CxS3N89uoxAuLveH1UCDLNF+llxbwgMQJwwOhHkhHhy6gCMRBb5JVFGjhqRRkCQX+NLD0iZTtpWTgeQDCIe1DIjPL8t9l+mezHjn8ef02cmxj8vf0q3PwUKCurrjPgfvTkUgm6IEW0AAAAASUVORK5CYII=
```

### 4. 动态数据徽标

支持的API（包括 GitHub, GitLab, Twitter, YouTube 等）查看官方文档 https://shields.io/badges/github-gist-stars

[![image](https://img.shields.io/github/stars/weizwz/hexo-butterfly-recommend?style=social)](https://img.shields.io/github/stars/weizwz/hexo-butterfly-recommend?style=social)

```
https://img.shields.io/github/stars/weizwz/hexo-butterfly-recommend?style=social
```

各个语言/框架/包的版本 https://shields.io/badges/mozilla-add-on-version

[![image](https://img.shields.io/npm/v/hexo-butterfly-recommend?color=409eff)](https://img.shields.io/npm/v/hexo-butterfly-recommend?color=409eff)

```
https://img.shields.io/npm/v/hexo-butterfly-recommend?color=409eff
```

数据统计 https://shields.io/badges/npm-package-minimized-gzipped-size-select-exports

[![image](https://img.shields.io/github/languages/code-size/weizwz/fun-animation?label=fun-animation%20code%20size)](https://img.shields.io/github/languages/code-size/weizwz/fun-animation?label=fun-animation%20code%20size)

```
https://img.shields.io/github/languages/code-size/weizwz/fun-animation?label=fun-animation%20code%20size
```

各个语言/框架/包的license https://shields.io/badges/aur-license

[![iamge](https://img.shields.io/aur/license/android-studio?logo=android-studio)](https://img.shields.io/aur/license/android-studio?logo=android-studio)

```
https://img.shields.io/aur/license/android-studio?logo=android-studio
```

下载量（包括浏览器插件、Eclipse应用市场、GitHub发布下载、npm包等） https://shields.io/badges/mozilla-add-on-downloads

[![image](https://img.shields.io/chrome-web-store/users/dhdgffkkebhmkfjojejmpbldmpobfkfo?label=%E7%AF%A1%E6%94%B9%E7%8C%B4)](https://img.shields.io/chrome-web-store/users/dhdgffkkebhmkfjojejmpbldmpobfkfo?label=%E7%AF%A1%E6%94%B9%E7%8C%B4)

```
https://img.shields.io/chrome-web-store/users/dhdgffkkebhmkfjojejmpbldmpobfkfo?label=%E7%AF%A1%E6%94%B9%E7%8C%B4
```

其他更多动态API请查看官方文档 https://shields.io/

## 实际应用

### 1. GitHub个人介绍

GitHub下新建同名（和你GitHub的ID同名，比如我的 https://github.com/weizwz/weizwz ）项目，然后编辑 `README.md` 保存即可，刷新到你的主页就会自动展示README文档

![image](https://www.helloimg.com/i/2024/12/31/6772cd113383e.png)

部分代码展示，完整代码请查看 [GitHub-weizwz](https://github.com/weizwz/weizwz/blob/main/README.md?plain=1)

```md
# >\_ Hello, Friend!

[![Portfolio](https://img.shields.io/website?down_color=lightgrey&down_message=offline&logo=%40thehackingsage&up_color=blue&up_message=portfolio&url=https%3A%2F%2Fweizwz.github.io)](https://weizwz.github.io)
[![Github](https://img.shields.io/github/followers/weizwz?style=social)](https://github.com/weizwz/)
```

### 2. GitHub项目徽章

在项目的 `README.md` 里加入下载量/收藏量/依赖库等徽章

![image](https://www.helloimg.com/i/2024/12/31/6772cd0f52fb8.png)

部分代码展示，完整代码请查看 [GitHub-vue](https://github.com/vuejs/vue/blob/main/README.md?plain=1)

```md
<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

<p align="center">
  <a href="https://circleci.com/gh/vuejs/vue/tree/dev"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg?sanitize=true" alt="Build Status"></a>
  <a href="https://codecov.io/github/vuejs/vue?branch=dev"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg?sanitize=true" alt="Coverage Status"></a>
  <a href="https://npmcharts.com/compare/vue?minimal=true"><img src="https://img.shields.io/npm/dm/vue.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>
  <a href="https://chat.vuejs.org/"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true" alt="Chat"></a>
</p>
```

### 3. 博客页脚

基于`hexo-theme-butterfly`主题，查看 [Butterfly文档](https://butterfly.js.org/posts/4aa8abbe/#Footer-%E8%A8%AD%E7%BD%AE)

![image](https://www.helloimg.com/i/2024/12/31/6772cd0feb868.png)

在 `custom_text` 字段里加入以下内容（省去了主题butterfly和腾讯云，因为自定义图标太长，直接代码不显示了，请自行添加）：

```yml
custom_text: <a target="_blank" href="https://hexo.io/" title="博客框架为Hexo_v7.0.0"><img src="https://img.shields.io/badge/Frame-Hexo-0E83CD?logo=hexo&logoColor=fff"></a><a target="_blank" href="https://github.com/" title="本站项目由Github托管"><img src="https://img.shields.io/badge/Website-Github-d021d6?logo=GitHub"></a><a target="_blank" href="https://www.algolia.com/" title="本站搜索使用Algolia搜索服务"><img src="https://img.shields.io/badge/Search-Algolia-003DFF?logo=Algolia"></a><a target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" title="本站采用CC BY-NC-SA 4.0国际许可协议进行许可"><img src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?logo=coursera&logoColor=fff"></a>
```

自定义css如下：

```css
.footer_custom_text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.footer_custom_text > a {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}
```

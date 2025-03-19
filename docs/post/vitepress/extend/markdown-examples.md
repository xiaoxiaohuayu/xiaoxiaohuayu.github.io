---
title: Markdown 最全扩展语法示例
description: 本文展示了 VitePress 提供的内置 Markdown 扩展功能，包括代码块行号显示、图片懒加载、标题锚点、网页链接、图片引用、表格语法、Emoji 表情、折叠语法、容器使用、代码高亮、代码导入、代码嵌套等配置和使用方法
lastUpdated: 2024-12-20 15:11:32+8:00
tags:
  - Markdown
  - VitePress
  - Github
---

# Markdown 最全扩展语法示例

此页面演示了 `VitePress` 提供的一些内置 `Markdown` 扩展的配置、使用方法和示例，同时也可参考官方文档 [Vitepress - Markdown 扩展](https://vitepress.dev/zh/guide/markdown)

## 基础功能

### 基本配置

::: code-group
```ts [.vitepress/config/index.ts]
export default defineConfig({
  // markdown配置搞里头
  markdown:{
      // 代码块行号显示
      lineNumbers: true,
      // 图片懒加载
      image: {
        lazyLoading: true
      },
      // 代码框内复制按钮的 title 提示
      codeCopyButtonTitle: '复制代码',
  },
})
```
:::

### 标题锚点 {#title-link}
标题会自动应用当前标题文字作为锚点，也支持自定义锚点，格式为 `标题+空格+{#自定义锚点}`
```md
## 标题锚点 {#title-link}
```
也可以利用链接跳转到指定标题
```md
[点击我跳转到基本配置](#基本配置)
```
**结果展示**

[点击我跳转到基本配置](#基本配置)

### 网页链接
网页链接的基本格式为 `[链接名称](链接url)`，而 `VitePress` 对网页链接做了特殊处理：
内部链接将转换为单页导航的路由链接，外部链接带有 `target="_blank" rel="noreferrer"`。示例如下

```md
[跳到当前页的网页链接](/vitepress/extend/markdown-examples#网页链接)

[新打开网页-唯知笔记](https://note.weizwz.com/)
```
**结果展示**

[跳到当前页的网页链接](/vitepress/extend/markdown-examples#网页链接)

[新打开网页-唯知笔记](https://note.weizwz.com/)

### 图片引用
图片引用的基本格式 `![图片说明文字](图片路径)`，这里的图片路径可以使用`相对位置/绝对位置/在线地址`。

如果你的图片文件放置在 `public` 目录下，那么使用绝对位置时可以省略 `public` 这一层。详情说明见 [Vitepress - public 目录](https://vitepress.dev/zh/guide/asset-handling#the-public-directory)

当前引用的示例图片所在位置

```md
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.ts
│  ├─ public
│  │  └─ logo.png     <------------------- LOGO位置
│  ├─ markdown.md
│  └─ post
│     └─vitepress
│        └─ extend
│           └─ markdown-examples.md    <-- 当前文档位置
│ 
└─ package.json
```

图片引用方法

```md
相对位置
![logo](../../../public/logo.png)
绝对位置，应省略 /public
![logo](/logo.png)
在线地址
![logo](https://note.weizwz.com/logo.png)
```
**结果展示**

相对位置
![logo](../../../public/logo.png)
绝对位置，应省略 /public
![logo](/logo.png)
在线地址
![logo](https://note.weizwz.com/logo.png)

### 表格语法

使用 `table` 标签，或者如下语法。示例中竖线尽量对齐是为了方便我们书写和辨认，非必须要求。

```md
| 默认居左对齐 | 居中对齐 | 居右对齐 |
| ---------- | :-----: | -----: |
| 内容1       | 内容2   | 内容3   |
| 内容4       | 内容5   | 内容6   |
```
**结果展示**

| 默认居左对齐 | 居中对齐 | 居右对齐 |
| ---------- | :-----: | -----: |
| 内容1       | 内容2   | 内容3   |
| 内容4       | 内容5   | 内容6   |

### Emoji表情

`Vitepress` 内置了常用的表情，供我们使用。查看所有 [Vitepress 支持的表情](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)，或者查看 [表情包大全](https://www.emojiall.com/zh-hans)

```md
:cn: :eight: :seven:
```
**结果展示**

:cn: :eight: :seven:

### 当前目录

```md
[[toc]]
```
**结果展示**

[[toc]]

### 折叠语法

```md
<details>
  <summary>点我展开</summary>
  Markdown默认折叠语法，Vitepress可以使用容器折叠语法，更加美观
</details>
```
**结果展示**

<details>
  <summary>点我展开</summary>
  Markdown默认折叠语法，Vitepress可以使用容器折叠语法，更加美观
</details>

## 容器使用

### 徽章组件

使用徽章可以向标题添加状态

```md
VitePress <Badge type="info" text="default" />

VitePress <Badge type="tip" text="^1.5.0" />

VitePress <Badge type="warning" text="beta" />

VitePress <Badge type="danger" text="caution" />
```
**结果展示**

VitePress <Badge type="info" text="default" />

VitePress <Badge type="tip" text="^1.5.0" />

VitePress <Badge type="warning" text="beta" />

VitePress <Badge type="danger" text="caution" />

### 引用块

```md
> 这是一个引用 `VitePress`
```
**结果展示**

> 这是一个引用 `VitePress`

### 折叠容器

```md
::: details 点我查看
这是一个折叠容器
:::
```
**结果展示**

::: details 点我查看
这是一个折叠容器
:::

### 提示容器

```md
::: info 信息
这是一条信息，格式为：`info+空格+自定义文字`
:::

::: tip 建议
这是一个建议，格式为：`tip+空格+自定义文字`
:::

::: warning 警告
这是一条警告，格式为：`warning+空格+自定义文字`
:::

::: danger 危险
这是一个危险警告，格式为：`danger+空格+自定义文字`
:::
```
**结果展示**

::: info 信息
这是一条信息，格式为：`info+空格+自定义文字`
:::

::: tip 建议
这是一个建议，格式为：`tip+空格+自定义文字`
:::

::: warning 警告
这是一条警告，格式为：`warning+空格+自定义文字`
:::

::: danger 危险
这是一个危险警告，格式为：`danger+空格+自定义文字`
:::

### github提示

```md
> [!NOTE] 提示
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP] 建议
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT] 重要
> 对用户达成目标至关重要的信息。

> [!WARNING] 警告
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION] 危险
> 行为可能带来的负面影响。
```
**结果展示**

> [!NOTE] 提示
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP] 建议
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT] 重要
> 对用户达成目标至关重要的信息。

> [!WARNING] 警告
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION] 危险
> 行为可能带来的负面影响。


## 代码高亮

### code标识

使用 code标识 可以对单个 `代码单词` 或者 `专业名词` 进行标注，以便高亮显示。其语法是，使用 `` 或者 `<code>` 标签

```md
`Vitepress` 高亮显示
<code>Vitepress</code> 高亮显示
```
**结果展示**

`Vitepress` 高亮显示
<code>Vitepress</code> 高亮显示

### 代码块

`VitePress` 使用 [Shiki](https://github.com/shikijs/shiki) 在 Markdown 代码块中使用彩色文本实现语法高亮。`Shiki` 支持多种编程语言。需要做的就是将有效的语言别名附加到代码块的开头：

````md
```js
export default {
  data () {
    return {
      title: '唯知笔记'
    }
  }
}
```
````

**结果展示**

```js
export default {
  data () {
    return {
      title: '唯知笔记'
    }
  }
}
```

### 行高亮

在代码块的语言名词之后，添加 `{n}`，来高亮某一行，连续行用 `-` ，不连续行用 `,`

或者在某一行后面添加 `// [!code highlight]` 注释实现行高亮。

````md
```js{4-5}
export default {
  data () {
    return {
      title: '唯知笔记',
      desc: '高效的知识分享网站',
      tagline: '知之为知之，不知为不知' //  [!!code highlight]
    }
  }
}
```
````

**结果展示**

```js{4-5}
export default {
  data () {
    return {
      title: '唯知笔记',
      desc: '高效的知识分享网站',
      tagline: '知之为知之，不知为不知' //  [!code highlight]
    }
  }
}
```

### 行聚焦

在某一行上添加 `// [!code focus]` 注释将聚焦它并模糊代码的其他部分。

此外，可以使用 `// [!code focus:<lines>]` 定义要聚焦的行数。

````md
```js
export default {
  data () {
    return {
      title: '唯知笔记', // [!!code focus:2]
      desc: '高效的知识分享网站',
      tagline: '知之为知之，不知为不知'
    }
  }
}
```
````
**结果展示**

```js
export default {
  data () {
    return {
      title: '唯知笔记', // [!code focus:2]
      desc: '高效的知识分享网站',
      tagline: '知之为知之，不知为不知'
    }
  }
}
```

### diff差异

在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 `diff`，同时保留代码块的颜色。

````md
```js
export default {
  data () {
    return {
      title: '唯知笔记',
      desc: '一个有趣的的知识分享网站', // [!!code --]
      desc: '高效的知识分享网站', // [!!code ++]
    }
  }
}
```
````

**结果展示**

```js
export default {
  data () {
    return {
      title: '唯知笔记',
      desc: '一个有趣的的知识分享网站', // [!code --]
      desc: '高效的知识分享网站', // [!code ++]
    }
  }
}
```

### 错误和告警
在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色

````md
```js
export default {
  data () {
    return {
      error: 'error', // [!!code error]
      warning: 'warning', // [!!code warning]
    }
  }
}
```
````

**结果展示**

```js
export default {
  data () {
    return {
      error: 'error', // [!code error]
      warning: 'warning', // [!code warning]
    }
  }
}
```

### 代码导入

`Vitepress` 支持从现有文件中导入代码，语法：`<<< 文件路径`。同时也支持行高亮 `<<< 文件路径{行号}`。文件路径可以是相对路径，也可以是 `@/` 开头的以根目录为起点的路径

当前引入的示例文件所处位置

```md
.
├─ docs
│  └─ post
│     └─vitepress
│        └─ extend
│           └─ markdown-examples.md    <-- 当前文档位置
│           └─ markdown-examples.vue   <-- 当前引用的文件位置
│ 
└─ package.json
```

**导入语法**

```md
<<< ./markdown-examples.vue{2}
或者
<<< @/post/vitepress/extend/markdown-examples.vue{2}
```

**导入结果展示** (同时也是导入文件的源内容)

<<< @/post/vitepress/extend/markdown-examples.vue{2}

也可以使用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding) 来只包含代码文件的相应部分。可以在文件目录后面的 # 符号后提供一个自定义的区域名。

> [!NOTE] 提示
> 这里说一下 `VS Code region` 要求的代码片段语法：`// #region` 为开头，`// #endregion` 为结尾，后面可以跟上名称来区分不同的代码片段。如上 `markdown-examples.vue` 中示例

**导入语法**

```md
<<< ./markdown-examples.vue#text{2}

```
**导入结果展示**

<<< ./markdown-examples.vue#text{2}

### 代码嵌套

可以使用更多的 反引号```` 包围对应的代码，来展示我们想要表达的代码书写规则

`````md
````md
```js
export default {
  data () {
    return {
      title: '唯知笔记'
    }
  }
}
```
````
`````

**结果展示**

````md
```js
export default {
  data () {
    return {
      title: '唯知笔记'
    }
  }
}
```
````

### 代码块组

````md
::: code-group
```sh [pnpm]
#查询pnpm版本
pnpm -v
```
```sh [yarn]
#查询yarn版本
yarn -v
```
:::
````
**结果展示**

::: code-group
```sh [pnpm]
#查询pnpm版本
pnpm -v
```
```sh [yarn]
#查询yarn版本
yarn -v
```
:::

### 代码标题

利用代码块组的语法和效果，我们也可以为单个代码块显示代码块标题或者代码文件名称及文件路径
````md
::: code-group
```vue [post/vitepress/extend/markdown-examples.vue]
<template>
  <div>{{ text }}</div>
</template>
```
:::
````

**结果展示**

::: code-group
```vue [post/vitepress/extend/markdown-examples.vue]
<template>
  <div>{{ text }}</div>
</template>
```
:::


## 其他用法

### md文件嵌套
可以使用 `<!--@include: markdown文件路径-->`，在一个 markdown 文件中嵌套另一个 markdown 文件的内容，`markdown文件路径` 可以是相对路径，也可以是 ` @/` 开头的以根目录为起点的路径

当前引入的示例文件所处位置

```md
.
├─ docs
│  └─ post
│     └─vitepress
│        └─ extend
│           └─ markdown-examples.md        <-- 当前文档位置
│           └─ markdown-examples-demo.md   <-- 当前嵌套的markdown文件位置
│ 
└─ package.json
```
**嵌套语法**


```md
<!---@include: ./markdown-examples-demo.md-->
```

**嵌套结果**

<!--@include: ./markdown-examples-demo.md-->



### 数学方程

现在这是可选的。要启用它，需要安装 `markdown-it-mathjax3`，在配置文件中设置 `markdown.math` 为 `true`

```sh
pnpm add -D markdown-it-mathjax3
```

::: code-group
```ts [.vitepress/config.ts]
export default {
  markdown: {
    math: true
  }
}
```
:::

### 高级配置

>查看 `vitepress` 中 [markdown 可配置的字段](https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts)

在配置文件中设置 `codeTransformers` 来避免 `markdown-it` 渲染我们不想渲染的某些代码，或者使用 `config` 来对 markdown 中的内容进行替换或者批量处理。下面代码仅做演示使用，可自行修改。

::: code-group
```ts [.vitepress/config.ts]
// https://shiki-zh-docs.vercel.app/packages/vitepress
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

export default {
  markdown: {
    codeTransformers: [
      // 使用 `!!code` 防止转换，演示代码用
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
      // 引入此组件来显示代码中的类型
      transformerTwoslash(),
    ],
    // 对markdown中的内容进行替换或者批量处理
    config: (md) => {
      // 创建 markdown-it 插件
      md.use((md) => {
        // 标题时间和文字统计组件(<weiz-title-meta />)插入h1标题下
        md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<weiz-title-meta />`; 
          return htmlResult;
        }
        // 内容批量替换
        const defaultRender = md.render
        md.render = function (...args) {
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          defaultContent = defaultContent.replace(/mlgb/g, '***')
          // 返回渲染的内容
          return defaultContent
        }
      })
    }
  }
}
```
:::




<style lang="scss" scoped>
img {
  width: 100px;
}
</style>
---
title: 运行时 API - 含示例
description: 本文介绍了 VitePress 的常用运行时 API，包括 useData、useRouter 和 withBase。这些 API 允许访问站点数据、编程导航和路径处理。示例代码展示了如何在 .md 和 .vue 文件中使用这些 API
lastUpdated: 2024-12-12 10:44:18+8:00
tags:
  - VitePress
---

# 运行时 API - 含示例

此页面展示了 `VitePress` 一些常用的 `运行时 API`，它可以让你访问站点内部的应用程序数据。

> [!WARNING] 注意
> 以 `use*` 开头的方法表示它是一个 `Vue3 组合式 API` 函数，只能在 `setup()` 或 `<script setup>` 中使用。

<script setup>
import { useData, useRouter, withBase } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
const routeData = useRouter()

const goUseRouter = () => {
  routeData.go(routeData.route.path + '#userouter')
}
</script>

## `useData`

返回特定页面的数据，可用于访问当前页面的网站、主题和页面数据，它在 `.md` 和 `.vue` 文件中都有效。

#### 数据类型

```ts
interface VitePressData<T = any> {
  /**
   * 站点级元数据
   */
  site: Ref<SiteData<T>>
  /**
   * .vitepress/config.js 中的 themeConfig
   */
  theme: Ref<T>
  /**
   * 页面级元数据
   */
  page: Ref<PageData>
  /**
   * 页面 frontmatter
   */
  frontmatter: Ref<PageData['frontmatter']>
  /**
   * 动态路由参数
   */
  params: Ref<PageData['params']>
  title: Ref<string>
  description: Ref<string>
  lang: Ref<string>
  isDark: Ref<boolean>
  dir: Ref<string>
  localeIndex: Ref<string>
}

interface PageData {
  title: string
  titleTemplate?: string | boolean
  description: string
  relativePath: string
  filePath: string
  headers: Header[]
  frontmatter: Record<string, any>
  params?: Record<string, any>
  isNotFound?: boolean
  lastUpdated?: number
}
```
#### 用法示例

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

主题数据
<pre>{{ theme }}</pre>

页面数据
<pre>{{ page }}</pre>

页面格式
<pre>{{ frontmatter }}</pre>

```

#### 数据展示

`frontmatter数据`

<div class="language-json">
  <span class="lang">json</span>
  <pre class="vp-code dynamic-code">
    <code>{{ frontmatter }}</code>
  </pre>
</div>

## `useRouter`

返回 VitePress 路由实例，以便可以以编程方式导航到另一个页面。

#### 数据类型

```ts
interface Route {
  path: string
  data: PageData
  component: Component | null
}

interface Router {
  /**
   * 当前路由
   */
  route: Route
  /**
   * 导航到新的 URL
   */
  go: (to?: string) => Promise<void>
  /**
   * 在路由更改前调用。返回 `false` 表示取消导航
   */
  onBeforeRouteChange?: (to: string) => Awaitable<void | boolean>
  /**
   * 在页面组件加载前（history 状态更新后）调用。返回 `false` 表示取消导航
   */
  onBeforePageLoad?: (to: string) => Awaitable<void | boolean>
  /**
   * 在页面组件加载后（页面组件实际更新前）调用
   */
  onAfterPageLoad?: (to: string) => Awaitable<void>
  /**
   * 在路由更改后调用
   */
  onAfterRouteChanged?: (to: string) => Awaitable<void>
}
```

#### 用法示例

```md
<a @click="goUseRouter">点我去 userouter</a>

<script setup>
import { useRouter } from 'vitepress'

const routeData = useRouter()

const goUseRouter = () => {
  routeData.go(routeData.route.path + '#userouter')
}
</script>
```

#### 效果展示

<a @click="goUseRouter">点我去 userouter</a>

## `withBase`

将配置的 `URL` 路径 追加到给定的 `URL` 路径 (也许是根目录下)。另请参阅 [`Base URL`](https://vitepress.dev/zh/guide/asset-handling#base-url)。

#### 参数类型

```ts
withBase(path: string) => string
```

#### 用法示例

```md
<img width="100" :src="withBase('../../logo.png')" alt="head-avatar" />
<img width="100" :src="withBase(theme.logoPath)" alt="head-avatar" />

<script setup lang="ts">
import { withBase } from 'vitepress'

const { theme } = useData()
</script>
```
> [!NOTE] 提示
> 此示例中，`../../logo.png` 是 logo图片 相对于本文档的位置，`theme.logoPath` 则是站点数据配置中的 logo图片 位置，两者都指向了同一个图片。

#### 效果展示
<img width="100" :src="withBase('../../logo.png')" alt="head-avatar" />
<img width="100" :src="withBase(theme.logo)" alt="head-avatar" />

## $frontmatter

在 Vue 表达式中直接访问当前页面的 `frontmatter` 数据，效果等同于 `useData()` 里的 [`frontmatter`](#数据展示)。

#### 用法示例

```md
<pre>{{ $frontmatter }}</pre>
```

#### 数据展示

<div class="language-json">
  <span class="lang">json</span>
  <pre class="vp-code dynamic-code">
    <code>{{ $frontmatter }}</code>
  </pre>
</div>

## 更多

请查看官方文档 [VitePress 运行时 API](https://vitepress.dev/zh/reference/runtime-api)。
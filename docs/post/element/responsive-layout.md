---
title: 巧用 Element 自适应布局
description: 这篇文章介绍了 Element UI 的 响应式布局，包括五个预设的响应尺寸：xs、sm、md、lg 和 xl。每个尺寸对应不同的屏幕宽度范围，并提供了 Vue.js 中的使用示例，展示了如何根据屏幕尺寸调整布局
lastUpdated: 2024-12-31 18:24:53+8:00
tags: 
 - Element
 - Vue.js
---

# 巧用 Element 自适应布局

> 在线文档查看 [Element - 响应式布局](https://element-plus.org/zh-CN/component/layout.html)

## 自适应范围

Element 参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

以下是各自代表的自适应范围：

| 尺寸 | 范围                                | 优先级         |
| ---- | ----------------------------------- | -------------- |
| xs   | only screen and (max-width: 767px)  | 小屏优先级最高 |
| sm   | only screen and (min-width: 768px)  | -              |
| md   | only screen and (min-width: 992px)  | -              |
| lg   | only screen and (min-width: 1200px) | -              |
| xl   | only screen and (min-width: 1920px) | 宽屏优先级最高 |
| span | 默认，除以上情况外生效              | 优先级最低     |

## 使用示例

```vue
<el-row :gutter="10">
  <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="4">
    <div class="grid-content ep-bg-purple" />
  </el-col>
  <el-col :span="24" :sm="8" :md="12" :lg="16" :xl="20">
    <div class="grid-content ep-bg-purple-light" />
  </el-col>
</el-row>
```

> [!NOTE] 提示
> `xs` 只限定于屏幕宽度小于768px生效，而 `span` 可补足其他所有情况。


---
title: 渲染报错 Hydration completed but contains mismatches
description: 文章讨论了在 VitePress 项目中，浏览器控制台出现 “Hydration completed but contains mismatches” 错误的原因及解决方案。1主要原因是服务端渲染的 HTML 结构与客户端渲染的虚拟 DOM 不匹配。解决方法是将动态数据的渲染放到 onMounted 钩子中，以确保客户端和服务端的渲染结果一致
lastUpdated: 2024-12-31 09:57:00+8:00
tags: 
 - VitePress
 - SSR
 - Vue.js
---

# 渲染报错 Hydration completed but contains mismatches

>`vitepress` 项目部署到线上后，浏览器控制台出现报错 `Hydration completed but contains mismatches`，但是本地没有出现这个问题。

## 问题分析

直译报错信息：水合作用完成，但是存在不匹配。哇，水合作用？什么鬼，简直看得人是一头雾水，直接百度：**如果预渲染的 HTML 的 DOM 结构不符合客户端应用的期望，就会出现激活不匹配。**

详细来说，就是：
1. VitePress 使用了服务端渲染(SSR)，在服务端已经渲染好了html结构，这样在客户端不用再创建dom，直接激活这些html就可以了。
2. 在激活的过程中，Vue将检查 `客户端生成的虚拟dom树/数据` 是否和 `服务端渲染的dom结构/数据` 匹配，如果不匹配就会出现这样的报错。

那么我们就可以猜到大概率是我们使用的vue组件不当，没有合理的使用它的方法/生命周期，导致某些 **dom结构或数据在生效之前被服务端所渲染**，然后在客户端被vue检查到 **跟vue所对应的dom结构或数据不同**，因而产生了报错。

检查我们的vue组件：

```vue twoslash
<template>
  <div class="updated">
    <span>更新于 {{ date.toLocaleDateString() }}</span>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
const { page } = useData()
const date = computed(() => new Date(page.value.lastUpdated!))
</script>
```
可以看到以上代码，vue会重新计算 `page.value.lastUpdated!` 的值，因而服务端渲染的数据可能和客户端vue渲染的数据不同。

## 解决方案

对于以上代码中可能出现的动态数据/内容，那我们可以 **放到界面加载完后，再由vue去重新渲染**，这样vue在客户端对比dom虚拟树/数据时，所有的内容都是 **初始** 的状态，因而不会出现不匹配的情况。

综上，我们使用 vue 的 `onMounted`，代码修改如下：
```vue twoslash
<template>
  <div class="updated">
    <span>更新于 {{ date }}</span>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
const { page } = useData()
const date = ref('')

onMounted(() => {
  date.value = (new Date(page.value.lastUpdated!)).toLocaleDateString()
})
</script>
```

代码提交部署后，报错消失，问题解决。

## 总结

在 vitepress 中使用 vue 组件时，需要注意 `vue组件中的动态内容/数据`，尽量放到 `onMounted` 中去完成，避免出现渲染内容在服务端和客户端不匹配的情况。


参考文档：
+ [Hydration completed but contains mismatches 报错，如何解决？](https://www.cnblogs.com/changxue/p/17735469.html)
+ [Vue.js - 激活不匹配](https://cn.vuejs.org/guide/scaling-up/ssr#hydration-mismatch)


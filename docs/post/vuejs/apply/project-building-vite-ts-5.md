---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(5) - 路由router
description: 这篇文章介绍了如何使用 Vite4、Typescript、Vue3 和 Pinia 从零搭建项目的路由部分。内容包括 安装 vue-router、创建示例页面、配置路由文件、修改 App.vue 和 main.ts 以集成路由，并提供了预览和进一步使用的链接
firstCommit: 2023-11-29 21:33:04+8:00
lastUpdated: 2023-11-29 21:33:04+8:00
tags:
  - Vue.js
  - Vite
  - TypeScript
  - 路由
---

# Vite4+Typescript+Vue3+Pinia 从零搭建(5) - 路由router

> 项目代码同步至码云 [weiz-vue3-template](https://gitee.com/weizwz/weiz-vue3-template)
>
> [Vue Router](https://router.vuejs.org/zh/) 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。

## 1. 安装

```sh
npm i vue-router@4
```

## 2. 集成

### 1. 新建两页面进行示例

在`src/view`下新建`home.vue`和`login.vue`，内容如下：

```html
<script setup lang="ts">
  defineOptions({
    name: 'V-home'
  })
</script>

<template>
  <div>home page</div>
</template>

<style scoped></style>
```

`login.vue`里修改下对应name即可

### 2. `src`下新建`router`文件夹

`index.ts`作为路由入口，`static.ts`作为静态路由，`modules`内还可以放入其他类型路由，整体目录结构如下：

```md
src
|  
+---router
| | index.ts
| +---modules
| | static.ts
```

`static.ts`内容如下：

```ts
const routes = [
  {
    path: '/',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue') //路由懒加载
  }
]

export default routes
```

`index.ts`内容如下：

```ts
import { Router, createRouter, createWebHistory } from 'vue-router'

/** 自动导入 src/router/modules 下的静态路由
 * import.meta.glob使用说明：https://cn.vitejs.dev/guide/features#glob-import
 */
const modules: Record<string, any> = import.meta.glob(['./modules/**/*.ts'], {
  eager: true
})

/** 初始路由 **/
const routes: any[] = []

Object.keys(modules).forEach((key) => {
  const module = modules[key].default
  if (Array.isArray(module)) {
    for (const item of module) {
      routes.push(item)
    }
  } else {
    routes.push(module)
  }
})

/**
 * 创建路由实例
 * createRouter选项有：https://router.vuejs.org/zh/api/interfaces/RouterOptions.html
 * hash模式使用createWebHashHistory(): https://router.vuejs.org/zh/api/#Functions-createWebHashHistory
 */
export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior(_to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

/**
 * 路由守卫
 * https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 */
router.beforeEach((to, _from, next) => {
  // isAuthenticated 代表你的鉴权
  const isAuthenticated = true
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
```

### 3. 修改`App.vue`

承载路由，并增加导航

```html
<script setup lang="ts"></script>

<template>
  <router-link to="/"> 去首页 </router-link> 丨 <router-link to="/login"> 去登录 </router-link>
  <router-view />
</template>

<style scoped></style>
```

### 4. 修改`main.ts`

使用路由

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from '@/router/index'

createApp(App).use(router).mount('#app')
```

## 3. 预览

![images](https://www.helloimg.com/i/2025/01/02/677668c277fd7.gif)

其他用法，包括传参、重定向、动态路由、过渡动效等，请参考[官方文档](https://router.vuejs.org/zh/)。

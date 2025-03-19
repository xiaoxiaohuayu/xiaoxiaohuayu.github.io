---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(6) - 状态管理pina
description: 这篇文章介绍了如何使用 Vite4、Typescript、Vue3 和 Pinia 从零搭建项目，重点讲解了 Pinia 的安装、实例创建、状态管理和持久化方法。文章还提供了具体的代码示例，展示了如何在项目中集成和使用 Pinia 进行状态管理
firstCommit: 2023-12-05 11:00:56+8:00
lastUpdated: 2023-12-05 11:00:56+8:00
tags:
  - Vue.js
  - Vite
  - TypeScript
  - Pina
  - cookie
---

# Vite4+Typescript+Vue3+Pinia 从零搭建(6) - 状态管理pina

>项目代码同步至码云 [weiz-vue3-template](https://gitee.com/weizwz/weiz-vue3-template)
>
>pina 是 vue3 官方推荐的状态管理库，由 Vue 核心团队维护，旨在替代 vuex。pina 的更多介绍，可从 [pina官网](https://pinia.vuejs.org/zh/) 查看

## 特点
+ 更简洁直接的 API，提供组合式风格的 API
+ 支持模块热更新和服务端渲染
+ 对TS支持更为友好

## 安装
```shell
npm i pinia
```

## 使用
### 1. 创建实例
src目录下新建store文件夹，并新建index.ts文件
```ts
import { createPinia } from 'pinia'

const store = createPinia()

export default store
```
### 2. 使用实例
在main.ts里引入并使用
```ts
import { createApp } from 'vue'
import pinia from '@/store'
import './style.css'
import App from './App.vue'

import router from '@/router/index'

createApp(App).use(router).use(pinia).mount('#app')
```
### 3. 创建store
types文件夹下创建store.ts类型声明
```ts
export interface UserState {
  token: string
  userInfo: { name?: string; phone?: string }
}
```

store目录下新建modules文件夹，并新建user.ts文件
```ts
import { defineStore } from 'pinia'
import { UserState } from 'types/store'

// 第一个参数是id，唯一
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: 'EFA68205747CB561BB7C0F85D5689856',
      userInfo: { name: 'weizwz', phone: '18392016879' }
    }
  },
  getters: {
    namePic: (state) => state.userInfo.name.substring(0, 1)
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    }
  }
})
```
### 4. 使用store
修改view文件夹下的home.vue来获取store
```html
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@store/user'

defineOptions({
  name: 'V-home'
})

const userStore = useUserStore()
// 获取state使用computed或者使用storeToRefs，直接使用不具备响应式（拿到的永远是初次的值）
const username = computed(() => userStore.userInfo.name)
// 获取getter使用storeToRefs，或者直接使用，在模板里 userStore.namePic
const { namePic, token } = storeToRefs(userStore)
</script>

<template>
  <div>Hello: {{ namePic }}, your name is {{ username }}, your token is {{ token }}</div>
</template>

<style scoped></style>
```

修改view文件夹下的login.vue来设置store
```html
<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@store/user'

defineOptions({
  name: 'V-login'
})

const userStore = useUserStore()
const { userInfo, token } = storeToRefs(userStore)
const userName = ref(userInfo.value.name)
const userToken = ref(token)

const updateUserName = () => {
  userStore.setUserInfo({
    name: userName.value
  })
}
const updateUserToken = () => {
  userStore.setToken(userToken.value)
}
</script>

<template>
  <div>login page</div>
  name:
  <input type="text" v-model="userName" @input="updateUserName" />
  <br />
  token:
  <input type="text" v-model="userToken" @input="updateUserToken" />
</template>

<style scoped></style>
```

**如果`@store/user`不能识别，请在`tsconfig.json`中的`paths`里加入此路径**
```json
"paths": {
  "@store/*": ["src/store/modules/*"],
},
```
## 持久化
由于刷新界面会导致store重置，所以一般通过将store存储到cookie或者storage里使其持久化。cookie方面的插件，我这里推荐使用`js-cookie`
### 1. 安装
```shell
npm i js-cookie -S
npm i @types/js-cookie -S
```
### 2.封装
在src下新建utils文件夹，并新建auth.ts
```ts
import Cookies from 'js-cookie'

export const TokenKey = 'weiz-token'

type ExpiresData = Date | number
export interface TokenInfo {
  token: string
  expires: ExpiresData
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(data: TokenInfo) {
  const { token, expires } = data
  return expires ? Cookies.set(TokenKey, token, { expires: expires }) : Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
```
### 3. 使用
修改store下的user.ts
```ts
import { getToken, setToken } from '@/utils/auth'
// 省略
state: () => {
  return {
    token: getToken() || 'EFA68205747',
    userInfo: { name: 'weizwz', phone: '18392016879' }
  }
}
// 省略
setToken(token: string) {
  this.token = token
  setToken({
    token,
    expires: 30
  })
}
```
## 效果展示
![image](https://www.helloimg.com/i/2025/01/02/677669240451a.gif)


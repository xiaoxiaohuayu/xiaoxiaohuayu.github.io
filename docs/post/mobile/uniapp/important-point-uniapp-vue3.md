---
title: uni-app+vue3常见问题总结
description: 本文记录了作者在使用uni-app和vue3开发过程中遇到的问题及解决方案，包括单端代码、安全边距、全局组件、DOM信息获取、URL传参、父子组件通信等方面的详细步骤和注意事项
firstCommit: 2024-02-01 19:34:18+8:00
lastUpdated: 2024-02-06 22:14:03+8:00
tags:
  - uni-app
  - Vue.js
  - TypeScript
---

# uni-app+vue3常见问题总结

> 已经用 uni-app+vue3+ts 开发了一段时间，记录一下日常遇见的问题和解决办法

## uni-app 中的单端代码

uni-app 是支持多端，如果你想让你的代码，只在部分平台使用，那么就需要用的它的单端处理语法 `//#ifdef` 和 `//#ifndef` 等。

### 1. `//#ifdef xxx` 只在xxx平台生效

```ts
//#ifdef MP-WEIXIN
menuButtonInfo = '微信'
//#endif
```

### 2. `//#ifndef xxx` 除了xxx平台，其他都生效

```ts
//#ifndef MP-WEIXIN
menuButtonInfo = '只要不是微信，其他都可以'
//#endif
```

## 安全边距

### 1. 异形屏

因为有异形手机屏的存在，最顶部有摄像头，最下面有导航条，为了避免界面内容出现在这些位置，所以每次在界面初始要设置安全边距。

```html
<script setup lang="ts">
  // 获取屏幕边界到安全区域距离
  const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="specification-panel flex-column" :style="{ paddingTop: safeAreaInsets.top + 'px' }">
    <!-- 底部导航 -->
    <view class="bottomNav" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
  </view>
</template>
```

### 2. 微信胶囊

由于微信小程序右上角有微信胶囊，很多时候我们为了保持界面整齐，需要获取微信胶囊的位置，来让我们得元素和它对齐。

```ts
// 微信胶囊一定处于安全位置，所以有微信胶囊就拿胶囊的位置，否则再去获取安全边距
export const safeTop = () => {
  const { safeAreaInsets } = uni.getWindowInfo()
  // 获取胶囊信息 https://uniapp.dcloud.net.cn/api/ui/menuButton.html#getmenubuttonboundingclientrect
  let menuButtonInfo = { top: 0 }
  //#ifdef MP-WEIXIN
  menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  //#endif

  const top = menuButtonInfo.top || safeAreaInsets?.top
  return {
    top
  }
}
```

## 全局组件

`全局组件` 目前只能在 `src/pages.json` 里配置，代码如下：

```json
// 组件自动导入
"easycom": {
  // 开启自动扫描
  "autoscan": true,
  "custom": {
    // 使用了uni-ui 规则如下配置
    "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
    // 自定义组件，需要使用正则表达式
    "^Weiz(.*)": "@/components/Weiz$1/index.vue"
  }
}
```

使用的时候，直接在界面使用即可，无需再导入。

```html
<WeizCarousel class="categories-banner" size="small" />
```

## 获取DOM信息

有的时候我们需要去拿到界面元素的相关信息，然后进行一些处理，uni-app 提供了相关API，但需要和 vue3 配合使用

```html
<script setup lang="ts">
  import { getCurrentInstance } from 'vue'
  const instance = getCurrentInstance()

  const getNodeInfo = () => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select('.similar') // 获取界面元素，也可以传id
      .boundingClientRect((data) => {
        const nodeInfo: UniApp.NodeInfo = data as UniApp.NodeInfo
        console.log(nodeInfo)
      })
      .exec()
  }
</script>
```

**是的你没看错，不需要给元素设置 `ref`**

## url 传参

url 跳转界面有两种方式，一种是使用 `navigator` 标签，一种是使用 `uni.navigateTo` 方法。
需要注意的是url有长度限制，太长的字符串会传递失败，而且参数中出现空格等特殊字符时需要对参数进行编码，如使用 `encodeURIComponent` 等。

### 1. 传递参数

```ts
uni.navigateTo({
  url: 'pages/test?id=1&name=uniapp'
})
```

或者

```html
<script setup lang="ts">
  const item = ref({ id: 1, name: 'uniapp' })
</script>
<template>
  <navigator :url="'/pages/test/test?item='+ encodeURIComponent(JSON.stringify(item))"></navigator>
</template>
```

### 2. 接受参数

在 `pages/test` 界面

```ts
onLoad: function(option) {
  console.log(option.id, option.name)
  // 如果传递的是经过编码的参数
  const item = JSON.parse(decodeURIComponent(option.item));
}
```

## 父子组件通信

### 简单参数

子组件：

```html
<script setup lang="ts">
  // 使用 defineProps 来接受参数，非必要参数使用 xxx? 的形式
  defineProps<{
    title: string
    subTitle?: string
  }>()
</script>

<template>
  <view class="weiz-title">
    <view class="title">{{ title }}</view>
    <view class="sub-title">{{ subTitle }}</view>
  </view>
</template>
```

父组件：

```html
// 由于是全局组件，所以无需再引入，如果不是全局组件，需要单独引入 <WeizTitle title="详情" />
```

### 复杂参数

如果参数比较复杂，可以直接用 TS 去定义类型，下面举例：

子组件：

```html
<script setup lang="ts">
  // 引入参数类型
  import type { CategoryItem } from '@/types/api'

  // 定义 props 接收数据
  defineProps<{
    list: CategoryItem[]
  }>()
</script>
```

父组件：

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  // 引入数据类型
  import type { CategoryItem } from '@/types/api'
  // 引入接口
  import { getCategoryIndexAPI } from '@/api/category'

  // 定义响应式数据
  const categoryList = ref<CategoryItem[]>([])
  // 获取数据方法
  const getCategoryList = async () => {
    const res = await getCategoryIndexAPI()
    // 拿到数据赋值
    categoryList.value = res.result
  }
  // 调用方法
  onLoad(() => {
    getCategoryList()
  })
</script>

<template>
  <WeizCategory :list="categoryList" @refresh="getCategoryList" />
</template>
```

### 父调子方法

父调子需要子组件通过 `defineExpose` 暴露方法给父组件，然后父组件拿到子组件实例再去调用子组件方法。

#### 1. 子组件暴露方法

```ts
// 定义方法
const getCurrentSpec = () => {
  return currentSpec.value
}
// 暴露方法给父组件
defineExpose({
  getCurrentSpec
})
```

#### 2. 父组件拿到实例调用

可参考章节 `TS 相关 - 定义组件实例类型`，调用子组件需要先拿到子组件的实例，拿到实例后直接调用即可。

```ts
// 拿到子组件实例 WeizCategoryInstance 需要我们去 ts 里定义
const weizCategory = ref<WeizCategoryInstance>()
// 调用子组件实例的方法
weizCategory.value.getCurrentSpec()
```

### 子调父方法

子调父方法，需要父组件去给子组件添加自定义事件，然后子组件通过 `defineEmits` 去触发。

#### 1. 父组件声明自定义事件

```html
<script setup lang="ts">
  const handleUpdate = (value: string) => {
    console.log('拿到子组件的传值，并且调用了父组件', value)
  }
</script>

<template>
  <WeizCategory :list="categoryList" @update="handleUpdate" />
</template>
```

#### 2. 子组件使用 `defineEmits`

```html
<script setup lang="ts">
  import { ref, defineEmits } from 'vue'

  const message = ref('子组件的值')
  const popupEmit = defineEmits(['update'])

  function sendMessage() {
    popupEmit('update', message.value)
  }
</script>

<template>
  <div>
    <button @click="sendMessage">触发父组件方法</button>
  </div>
</template>
```

## TS 相关

### 定义组件实例类型

定义组件实例类型文件 `xxx.d.ts`

```ts
// 导入组件
import WeizCardList from '@/components/WeizCardList/index.vue'
// 全局类型
declare module 'vue' {
  export interface GlobalComponents {
    WeizCardList: typeof WeizCardList
  }
}
// 导出组件实例类型, 需要用到 InstanceType
export type CardListInstance = InstanceType<typeof WeizCardList>
```

在 vue 页面里使用：

```ts
// 导入组件实例类型
import type { CardListInstance } from '@/types/components'
// 拿到组件实例
const cardList = ref<CardListInstance>()
// 调用组件实例的方法
cardList.value?.resetData()
```

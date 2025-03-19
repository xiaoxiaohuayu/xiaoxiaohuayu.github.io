---
title: 常用TS语法总结
description: 本文总结了作者常用的TypeScript写法，包括基本用法、对象、数组、函数、类型联合、类型断言、泛型、动态变量名以及在Vue3中的应用等方面的详细步骤和注意事项
firstCommit: 2024-02-05 20:37:54+8:00
lastUpdated: 2024-02-06 10:23:17+8:00
tags:
  - TypeScript
  - Vue.js
---

# 常用TS语法总结

> 自己常用的 TS 写法总结，应该会一直更新。可使用 [TS在线编译](https://www.typescriptlang.org/zh/play) 校验 TS 语法。

## 基本用法

### 普通

```ts
const num: number = 10
const isStop: boolean = false
const title: string = '常用TS总结'
const curName: null = null
const curType: undefined = undefined
const birthday: Date = new Date()
```

### 对象

```ts
// type
type LoginParams = {
  account: string
}
// interface
interface LoginParams {
  account: string
}
```

不确定是否有此属性用 `?`

```ts
interface Info {
  id: string
  name: string
  birthday?: Date
}
const curInfo: Info = { id: 'dqe2e', name: 'weizwz' }
console.log(curInfo?.birthday) // undefined
```

### 数组

```ts
const nums: number[] = [1, 2, 3]
const answer: boolean[] = [false, true, false]
const names: string[] = ['w', 'e', 'i']
```

对象数组

```ts
interface Info {
  id: string
}
const curInfos: Info[] = [{ id: 'dqe2e' }, { id: 'der24' }]
```

### 函数

函数需要声明参数类型和返回值类型

```ts
// week: string 指参数的类型；最后的: string 指返回值类型
function getWeek(week: string): string {
  return '星期' + week
}
```

箭头函数

```ts
const getWeek = (week: string): string => {
  return '星期' + week
}
console.log(getWeek('六')) // '星期六'
```

没有返回值 用 `void` 表示

```ts
interface Cat {
  weight: 5
}
const getName = (obj: Cat): void => {
  console.log(obj.weight + '斤')
}
getName({ weight: 5 }) // '5斤'
```

### any类型

any 类型表示没有任何限制，及时后续使用改变了类型也不会报错。但是并不推荐使用 any，否则使用 TS 也失去了意义。

```ts
let x: any = 'weizwz'
x = 1
console.log(x) // 不报错，输出 1
```

真正的使用场景可能是老项目的升级，你无法确定老旧的代码具体是什么类型；或者一些特殊情况，比如接口返回值类型不确定，或者后续使用时你要修改它的类型。

```ts
function getStatus(code: any): Boolean {
  return code === '200' || code === 'ok' || code === 200 || code === true
}
console.log(getStatus(400)) // false
```

### 类型联合 `|`

某个变量可能是多个类型中的一个，用 `|` 来分隔

```ts
type Id = string | number
type stringBoolean = '1' | '0'
```

### 类型交叉 `&`

类型交叉一般用于多个类型组成的一个新类型，用 `&` 来连接

```ts
type Name = { name: string }
type User = Name & { age: number }

const zhangSan: User = { name: '张三', age: 18 }
```

### 类型断言

手动指定类型，写法是 `值 as 类型` 或 `<类型>值`。
为什么要手动指定类型，是在某些特定情况下，我们已经确定这种类型是可以这样操作，但是编译器不确定，会报错，所以我们使用类型断言去告诉编译器这样做没问题。

```ts
// 我们获取到 id = name 界面元素
const $name = document.getElementById('name')
// 不是所有界面元素都有 value 属性，在这里我们已经确实我们拿的是 输入框元素，
// 所以使用类型断言告诉编译器，如果存在这个元素，它一定是输入框元素，有 value 属性
if ($name) {
  ;($name as HTMLInputElement).value
}
```

## type 和 interface

type 命令用来定义一个类型的别名；
interface 用来声明对象结构。

### 区别

- type 能表示的任何类型组合; interface 只能表示对象结构的类型
- type 后面需要用 =；interface 后面不需要 =
- interface 可以继承自（extends）interface 或对象结构的 type；type 可以通过 & 做对象结构的继承
- 多次声明的同名 interface 会进行声明合并；type 不允许多次声明，一个作用域内不允许有多个同名 type

### 示例

`type` 使用

```ts
type stringBoolean = '1' | '0'

type Position = {
  x: number
  y: number
}

type Position3D = Position & { z: number }

const startPosition: Position = { x: 0, y: 10 }
const startPosition3D: Position3D = { x: 0, y: 10, z: 20 }

// type类型不允许多次声明
type Position = { z: number } // 报错，因为名为 Position 的类型已经被声明
```

`interface` 使用

```ts
interface Position {
  x: number
}
interface Position {
  y: number
}

const startPosition: Position = { x: 0, y: 10 }

// 同名但有相同属性，要求相同属性的类型要一致，否则会报错
interface Position {
  x: string
} // 报错，与刚开始定义的 x 类型冲突
```

继承扩展

```ts
interface Position3D extends Position {
  z: number
}

const startPosition3D: Position3D = { x: 0, y: 10, z: 20 }
```

## 泛型

泛型一般用 T 表示，表示其中的参数/属性/返回值可以是任何类型，如果有多个泛型，可以使用其他字母。
主要使用场景：有些对象中的属性，或者方法里的参数，可能有多个类型，具体类型根据使用场景来定。

### 基础使用

```ts
// type 这里的<T>就相当于类型入参，实际使用时传入具体类型
type Empty<T> = T | undefined | null

const noData: Empty<[]> = []
```

多个泛型

```ts
interface Info<T, S> {
  name: string
  types: T[]
  weight: S
}

const tom: Info<string, number> = { name: 'tom', types: ['cat', 'animal'], weight: 5 }
const idx: Info<number, string> = { name: 'idx', types: [1], weight: 'first' }
```

### 函数

```ts
// 函数 <T>是泛型写法；arr: T[] 是参数类型；:T 是返回值类型
function getFirst<T>(arr: T[]): T {
  return arr[0]
}
```

箭头函数 `<T,>` 加逗号是为了避免编译程序把 `<>` 解析成 `jsx`

```ts
const getFirst = <T>(arr: T[]): T => {
  return arr[0]
}

const arr: number[] = [1, 2, 3]
console.log(getFirst<number>(arr), getFirst(arr)) // <number>可省略，打印出来都是 1
```

### 嵌套

使用嵌套可以提供代码复用率，如果类型之间差别点太多就没必要了。

```ts
interface Tom<T> {
  name: string
  type: T
}
interface People {
  name: string
  type: 'person'
}
interface Cat {
  name: string
  type: 'animal'
}
// 我的兄弟 jakeTom
const myBrother: Tom<People> = {
  name: 'jakeTom',
  type: {
    name: 'my brother',
    type: 'person'
  }
}
// 我的猫咪 catTom
const myCat: Tom<Cat> = {
  name: 'catTom',
  type: {
    name: 'cat',
    type: 'animal'
  }
}
```

## 特殊用法

### 动态变量名

`Record<Keys, Type>` 返回一个对象类型，参数 `Keys` 用作键名，参数 `Type` 用作键值类型。

```ts
type stringKey = Record<string, string>
// 处理动态变量名
const list: stringKey = { img_1: 'img/1.png', img_2: 'img/2.png', img_3: 'img/3.png' }
for (const key in list) {
  console.log(list[key])
}
for (let i = 0; i < 3; i++) {
  console.log(list['img_' + (i + 1)])
}
```

## vue3中的TS

### 响应式数据

在 `xxx.d.ts` 里定义类型

```ts
interface Account = {
  id: string
  name: string
}
```

在 vue 界面里使用

```ts
// 简单类型可省略类型声明
const loading = ref(false)
const user = ref<Account>({
  id: 'E2U1EU91U',
  name: 'weiz'
})
```

### 参数传递

父组件使用

```html
<script setup lang="ts">
import { ref } from 'vue'
const user = ref<Account>({
  id: 'E2U1EU91U',
  name: 'weiz'
})
</script>
<template>
  <Children :account="user">
</template>
```

子组件接收参数

```ts
const props = defineProps<Account>()
```

如果没有声明 `Account`，则可以具体定义

```ts
const props = defineProps<{
  id: string
  name: string
}>()
```

### 组件实例类型

`InstanceType<T>` 是 ts 自带的类型，能够直接获取组件完整的实例类型。

子组件

```html
<script setup lang="ts">
  const open = () => {
    console.log('打开')
  }
  // 子组件暴露方法
  defineExpose({
    open
  })
</script>
```

父组件

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import Children from './Children.vue'

  type ChildCtx = InstanceType<typeof Children>
  // 要和子组件的 ref 名称一致
  const childrenRef = ref<ChildCtx | null>(null)
  // 调用子组件方法
  const openChildren = () => {
    childrenRef.value?.open()
  }
</script>
<template>
  <Children ref="childrenRef" />
</template>
```

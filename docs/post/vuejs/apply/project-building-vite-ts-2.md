---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(2) - TS配置
description: 这篇文章介绍了如何配置 tsconfig.json 和 tsconfig.node.json 文件，以便在 Vite4、Typescript、Vue3 和 Pinia 项目中使用。内容包括 编译选项、路径映射、类型定义 以及 类型检查命令 的设置
firstCommit: 2023-11-09 19:08:02+8:00
lastUpdated: 2023-11-09 19:08:02+8:00
tags:
  - TypeScript
  - Vue.js
  - Vite
---

# Vite4+Typescript+Vue3+Pinia 从零搭建(2) - TS配置

> 项目代码同步至码云 [weiz-vue3-template](https://gitee.com/weizwz/weiz-vue3-template)
>
> 关于tsconfig的配置字段可查看其他文档，如 [typeScript tsconfig配置详解](https://juejin.cn/post/6844904093568221191)

## `tsconfig.json`

文件修改如下:

```json
{
  "compilerOptions": {
    "target": "ESNext", // 将代码编译为最新版本的 JS
    "useDefineForClassFields": true,
    "module": "ESNext", // 使用 ES Module 格式打包编译后的文件
    "lib": ["ESNext", "DOM", "DOM.Iterable"], // 引入 ES 最新特性和 DOM 接口的类型定义
    "skipLibCheck": true, // 跳过对 .d.ts 文件的类型检查
    "esModuleInterop": true, // 允许使用 import 引入使用 export = 导出的内容
    "sourceMap": true, // 用来指定编译时是否生成.map文件
    "allowJs": false, // 是否允许使用js
    "baseUrl": ".", // 查询的基础路径
    "paths": {
      // 路径映射,配合别名使用
      "@/*": ["src/*"],
      "@build/*": ["build/*"],
      "#/*": ["types/*"]
    },

    /* Bundler mode */
    "moduleResolution": "node", // 使用 Node/bundler 的模块解析策略
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true, // 允许引入 JSON 文件
    "isolatedModules": true, // 要求所有文件都是 ES Module 模块。
    "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
    "jsx": "preserve", // 保留原始的 JSX 代码，不进行编译

    /* Linting */
    "strict": true, // 开启所有严格的类型检查
    "noUnusedLocals": true, // 报告未使用的局部变量的错误
    "noUnusedParameters": true, // 报告函数中未使用参数的错误
    "noFallthroughCasesInSwitch": true // 确保switch语句中的任何非空情况都包含
  },
  "include": [
    // 需要检测的文件
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "mock/*.ts",
    "types/*.d.ts",
    "vite.config.ts"
  ],
  "exclude": [
    // 不需要检测的文件
    "dist",
    "**/*.js",
    "node_modules"
  ],
  "references": [{ "path": "./tsconfig.node.json" }] // 为文件进行不同配置
}
```

## `tsconfig.node.json`

修改文件如下：

```json
{
  "compilerOptions": {
    "composite": true, // 对于引用项目必须设置该属性
    "skipLibCheck": true, // 跳过对 .d.ts 文件的类型检查
    "module": "ESNext", // 使用 ES Module 格式打包编译后的文件
    "moduleResolution": "Node", // 使用 Node/bundler 的模块解析策略
    "allowSyntheticDefaultImports": true // 允许使用 import 导入使用 export = 导出的默认内容
  },
  "include": ["vite.config.ts"]
}
```

## 类型定义

新建文件夹 `types`，用来存放类型定义。比如新建 `index.d.ts`：

```typescript
type TargetContext = '_self' | '_blank'
type EmitType = (event: string, ...args: any[]) => void
type AnyFunction<T> = (...args: any[]) => T
type PropType<T> = VuePropType<T>
type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}
type Nullable<T> = T | null
type NonNullable<T> = T extends null | undefined ? never : T

interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}
```

后续也可以新增其他文件，比如 `global.d.ts` 存放全局定义，`router.d.ts` 存放路由定义等

## 类型检查命令

修改 `package.json`，新增以下命令：

```json
"scripts": {
  "type-check": "vue-tsc --noEmit"
},
```

保存后，运行 `npm run type-check`，即可项目中是否有类型错误

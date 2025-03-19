---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(3) - Vite配置 
description: 本文介绍了如何使用 Vite4、Typescript、Vue3 和 Pinia 从零搭建项目，重点讲解了 Vite 的配置，包括初始内容、配置别名、环境变量设置及其使用方法
firstCommit: 2023-11-14 00:18:12+8:00
lastUpdated: 2023-11-14 00:18:12+8:00
tags:
  - Vite
  - Vue.js
  - TypeScript
---

# Vite4+Typescript+Vue3+Pinia 从零搭建(3) - Vite配置

> 项目代码同步至码云 [weiz-vue3-template](https://gitee.com/weizwz/weiz-vue3-template)
>
> 关于vite的详细配置可查看 [vite官方文档](https://cn.vitejs.dev/config/)，本文简单介绍vite的常用配置。

## 初始内容

项目初建后，`vite.config.ts` 的默认内容如下：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
```

## 配置别名

### 1. 安装 `@types/node`

```sh
npm i @types/node -D
```

![image](https://www.helloimg.com/i/2025/01/02/677666eddca53.png)

### 2. 修改 `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

// 设置别名，还可以添加其他路径
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@views': pathResolve('src/views'),
  '@store': pathResolve('src/store/modules')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias
  }
})
```

### 3. 使用

比如，修改 `App.vue`:

```ts
import HelloWorld from '@/components/HelloWorld.vue'
```

![image](https://www.helloimg.com/i/2025/01/02/677666ee0f857.png)

## 配置环境变量

### 1. 新建env文件

根目录下新建 `.env`、`.env.development`、`.env.production` 三个文件。
`.env` 文件内新增内容：

```txt
# 本地运行端口号
VITE_PORT = 8686
```

`.env.development` 文件内新增内容：

```txt
# 本地环境
VITE_USER_NODE_ENV = development

# 公共基础路径
VITE_PUBLIC_PATH = /
```

`.env.production` 文件内新增内容：

```txt
# 线上环境
VITE_USER_NODE_ENV = production

# 公共基础路径
VITE_PUBLIC_PATH = /
```

### 2. 环境变量统一处理

根目录下新建 `build` 文件夹，其目录下新建 `index.ts`，内容如下：

```ts
// 环境变量处理方法
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'VITE_PORT') realName = Number(realName)
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
```

### 3. 环境类型定义

在 `types\index.d.ts` 文件里新增对 `Recordable` 和 `ViteEnv` 的类型定义：

```ts
type Recordable<T = any> = Record<string, T>

interface ViteEnv {
  VITE_USER_NODE_ENV: 'development' | 'production'
  VITE_PUBLIC_PATH: string
  VITE_PORT: number
}
```

修改 `tsconfig.json` 文件，将 `build` 文件夹内的文件包含进去：

```json
"include": [ // 需要检测的文件
  "src/**/*.ts",
  "build/*.ts",
  "src/**/*.d.ts",
  "src/**/*.tsx",
  "src/**/*.vue",
  "mock/*.ts",
  "types/*.d.ts",
  "vite.config.ts"
],
```

同理，修改 `tsconfig.node.json` 文件：

```ts
"include": [
  "build/*.ts",
  "types/*.d.ts",
  "vite.config.ts"
]
```

### 4. 使用

修改 `vite.config.ts`：

```ts
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { wrapperEnv } from './build'

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

// 设置别名，还可以添加其他路径
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@views': pathResolve('src/views'),
  '@store': pathResolve('src/store')
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    plugins: [vue()],
    resolve: {
      alias
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      https: false,
      open: true,
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        '^/api': {
          target: 'http://192.168.1.4:8688',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
```

## 目录更新

当前项目目录如下：

```txt
|   .env
|   .env.development
|   .env.production
|   .gitignore
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   tree.txt
|   tsconfig.json
|   tsconfig.node.json
|   vite.config.ts
|
+---.vscode
|       extensions.json
|
+---build
|       index.ts
|
+---node_modules
+---public
|       vite.svg
|
+---src
|   |   App.vue
|   |   main.ts
|   |   style.css
|   |   vite-env.d.ts
|   |
|   +---assets
|   |       vue.svg
|   |
|   \---components
|           HelloWorld.vue
|
\---types
        index.d.ts
```

---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(1) - 项目初始化
description: 本文介绍了如何使用 Vite4、Typescript、Vue3 和 Pinia 从零开始搭建项目。内容包括 Node.js 和 VSCode 的准备工作，项目初始化步骤，依赖安装，目录结构查看，以及运行项目的方法
firstCommit: 2023-11-09 17:03:24+8:00
lastUpdated: 2023-11-09 17:03:24+8:00
tags:
  - Vue.js
  - Vite
  - TypeScript  
  - VSCode
---

# Vite4+Typescript+Vue3+Pinia 从零搭建(1) - 项目初始化

> 项目代码同步至码云 [weiz-vue3-template](https://gitee.com/weizwz/weiz-vue3-template)

## 前提准备

### 1. node版本

Node.js版本 >= 12，如果有老项目需要旧版本的，推荐用 `nvm` 管理node版本。

```sh
PS C:\Users\Administrator> nvm --version
1.1.11
PS C:\Users\Administrator> nvm list
  * 16.20.2 (Currently using 64-bit executable)
    14.21.1
PS C:\Users\Administrator> nvm use 14.21.1
Now using node v14.21.1 (64-bit)
```

### 2. vscode

推荐使用 `vscode` 编辑器，安装插件以下插件：
EditorConfig for VS Code， Volar，TypeScript Vue Plugin，Prettier - Code formatter，ESlint

## 项目初始化

### 1. 创建

```sh
npm create vite@latest vue3project -- --template vue-ts
```

`vue3project` 替换为你想创建的项目名称，比如我的是 `weiz-vue3-template`，示例如下：

```sh
PS D:\workspace\vue3> npm create vite@latest weiz-vue3-template -- --template vue-ts
npx: installed 1 in 11.915s
√ Select a framework: » Vue
√ Select a variant: » TypeScript

Scaffolding project in D:\workspace\vue3\weiz-vue3-template...

Done. Now run:

  cd weiz-vue3-template
  npm install
  npm run dev
```

### 2. 安装依赖

```sh
npm i
```

示例：

```sh
PS D:\workspace\vue3\weiz-vue3-template> npm i

> esbuild@0.18.20 postinstall D:\workspace\vue3\weiz-vue3-template\node_modules\esbuild
> node install.js
…………省略
added 43 packages from 50 contributors and audited 65 packages in 16.086s

4 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### 3. 查看目录

执行 `tree /f /a > tree.txt`，即可生成目录树文件 `tree.txt`
项目目录如下：

```sh
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
+---node_modules
+---public
|       vite.svg
|
\---src
    |   App.vue
    |   main.ts
    |   style.css
    |   vite-env.d.ts
    |
    +---assets
    |       vue.svg
    |
    \---components
            HelloWorld.vue
```

### 4. 运行

```sh
npm run dev
```

示例：

```sh
PS D:\workspace\vue3\weiz-vue3-template> npm run dev

> weiz-vue3-template@0.0.0 dev D:\workspace\vue3\weiz-vue3-template
> vite


  VITE v4.5.0  ready in 427 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 5. 查看界面

打开浏览器，输入 `http://127.0.0.1:5173/` 查看项目
<!-- ![image](/img/blog/20231109_1.png) -->

![image](https://www.helloimg.com/i/2025/01/02/677662e6416e2.png)

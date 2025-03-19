---
title: Nodejs 报错记录
description: 这篇文章记录了作者在使用Node.js和npm过程中遇到的一些常见错误及其解决方法。内容包括Node版本问题、权限问题、Node Sass版本不匹配等，并提供了详细的解决步骤和命令
firstCommit: 2022-10-21 14:20:16+8:00
lastUpdated: 2023-07-08 19:10:21+8:00
tags:
  - Node.js
  - npm
  - Vue.js
  - Sass
---

# Nodejs 报错记录

> 记录日常使用 `Nodejs` 以及 `npm` 过程中遇到的一些错误和解决办法

## ◉ `digital envelope routines::unsupported`

```sh
D:\workspace\vuedemo> npm run dev
...
error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
...
```

Nodejs升级到17版本以上时，运行之前的webpack项目会出现此问题。详情查看 [github](https://github.com/webpack/webpack/issues/14532)。

**解决办法有两种：**

1. 修改 `package.json`，在相关构建命令之前加入 `set NODE_OPTIONS=–openssl-legacy-provider & `
   ```js
   "scripts": {
     "serve": "set NODE_OPTIONS=–openssl-legacy-provider & vue-cli-service serve",
     "build": "set NODE_OPTIONS=–openssl-legacy-provider & vue-cli-service build",
     "lint": "set NODE_OPTIONS=–openssl-legacy-provider & vue-cli-service lint"
   }
   ```
2. 回退Nodejs版本，可以使用 `nvm管理工具`，管理多个Nodejs版本。

## ◉ 终端输入`vue -V` 报错 `在此系统上禁止运行脚本`

```sh
C:\Users\Administrator> vue -V
vue : 无法加载文件 D:\nodejs\node_global\vue.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ vue -V
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

**解决办法：**

1. 使用管理员模式启动终端
2. 执行命令：`get-ExecutionPolicy`（取得shell的当前执行策略），显示 `Restricted`（表示状态是禁止的）
3. 执行命令：`set-ExecutionPolicy RemoteSigned`
4. 执行命令：`get-ExecutionPolicy`，显示 `RemoteSigned` 则可以正常使用了

## ◉ `Node Sass does not yet support your current environment`

```sh
Syntax Error: Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (108)
For more information on which environments are supported please see:
https://github.com/sass/node-sass/releases/tag/v4.14.1
```

`node sass` 版本和当前node版本不匹配，点击查看[匹配版本](https://www.npmjs.com/package/node-sass)。
**解决办法：**

1. 卸载当前版本 `node sass`

```sh
npm uninstall --save node-sass
```

2. 安装对应版本的 `node sass`

```sh
npm install --save node-sass@版本
```

## ◉ `npm ERR! Invalid name: "xxx"`

```sh
PS D:\workspace\2023\scheduling-screeen> npm run serve
npm ERR! Invalid name: "scheduling screeen"
```

npm在发布时，`package.json` 中 `name` 属性值不准许有大写字母和空格，这。。。
**解决办法：**
修改 `package.json` 文件中 `name` 的名称

```json
{
  "name": "scheduling screeen",
  ...
}
```

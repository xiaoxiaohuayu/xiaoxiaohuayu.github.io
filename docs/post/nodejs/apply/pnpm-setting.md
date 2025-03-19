---
title: pnpm 安装和配置
description: 这篇文章介绍了如何配置pnpm，包括安装pnpm、设置全局安装路径和缓存路径等内容。文章提供了详细的命令和操作步骤，涵盖了pnpm安装和配置中的常见问题
firstCommit: 2022-12-03 20:32:09+8:00
lastUpdated: 2022-12-03 20:32:09+8:00
tags:
 - Node.js
 - pnpm
---

# pnpm 安装和配置

> 之前通过 `nvm` 来管理了 `nodejs` 版本，结果安装 `pnpm` 之后，安装全局依赖报错，如下：

```bash
PS C:\Users\Administrator> pnpm i -g commitizen
 ERROR  Unable to find the global bin directory
Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.
```

运行 `pnpm setup` 之后还是报这个错，看提示应该是配置问题，故做此纪录。

## 安装

通过 `npm` 安装即可。

```bash
PS C:\Users\Administrator> npm i -g pnpm
D:\node\nodejs\pnpm -> D:\node\nodejs\node_modules\pnpm\bin\pnpm.cjs
D:\node\nodejs\pnpx -> D:\node\nodejs\node_modules\pnpm\bin\pnpx.cjs
+ pnpm@7.17.1
added 1 package in 3.096s
```

查看 `pnpm` 命令，直接输入 `pnpm` 即可。

```bash
PS C:\Users\Administrator> pnpm
Version 7.17.1
Usage: pnpm [command] [flags]
       pnpm [ -h | --help | -v | --version ]

Manage your dependencies:
      add                  Installs a package and any packages that it depends on. By default, any new package is
                           installed as a prod dependency
      import               Generates a pnpm-lock.yaml from an npm package-lock.json (or npm-shrinkwrap.json) file
   i, install              Install all dependencies for a project
...
Options:
  -r, --recursive          Run the command for each project in the workspace.
```

## 配置

安装之后，发现 `pnpm` 的全局安装路径和缓存路径默认在C盘 `C:\Users\Administrator\AppData\Local\pnpm` 下，先修改下这两个配置。

### 配置全局安装路径

```bash
pnpm config set store-dir 你的全局地址
```

示例

```bash
PS C:\Users\Administrator> pnpm config set store-dir D:\node\pnpm\global
```

### 配置全局缓存路径

```bash
pnpm config set cache-dir 你的缓存地址
```

示例

```bash
PS C:\Users\Administrator> pnpm config set cache-dir D:\node\pnpm\cache
```

配置完之后，可安装一个全局依赖查看下最终效果。

### 其他配置

> `pnpm` 从命令行、环境变量和 `.npmrc` 文件中获取其配置。 来自 [官方文档](https://pnpm.io/zh/npmrc)

依据官方文档所说，其他的一些配置可以通过直接修改 `.npmrc` 文件增加，打开此文件后，发现我们之前增加的全局配置也在此文件内，也是应证了这一点。
文件位置 `C:\Users\Administrator\.npmrc`。

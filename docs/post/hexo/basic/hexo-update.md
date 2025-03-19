---
title: 博客升级 Hexo 版本记录
description: 这篇文章记录了Hexo博客的升级过程。内容包括如何检查当前版本、安装必要的工具、更新依赖项以及解决常见问题。通过这些步骤，用户可以顺利将Hexo博客升级到最新版本，确保博客的稳定性和安全性
firstCommit: 2023-11-25 10:05:41+8:00
tags:
  - Hexo
  - npm
---

# 博客升级 Hexo 版本记录

> 近日刚看到 `hexo-theme-butterfly` 升级到 `4.11.0` 版本了，更新文档里说明已支持 `hexo7.0.0`，于是升级作此记录

## 1. 定位到hexo博客根目录下, 运行 `hexo -v`, 查看当前版本

```sh
PS D:\workspace\blog\github-blog> hexo -v
INFO  Validating config
hexo: 6.3.0
```

## 2. `npm i hexo-cli -g`, 全局安装 hexo-cli

```sh
PS D:\workspace\blog\github-blog> npm i hexo-cli -g

changed 53 packages in 21s

14 packages are looking for funding
  run `npm fund` for details
```

## 3. `npm install -g npm-check`, 安装 npm-check，若已安装可以跳过

```sh
PS D:\workspace\blog\github-blog> npm install -g npm-check

added 361 packages, and audited 363 packages in 56s

4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## 4. `npm-check`, 检查系统插件是否需要升级

```sh
PS D:\workspace\blog\github-blog> npm-check

hexo                                😎  MAJOR UP  Major update available. https://hexo.io/
                                                 npm install hexo@7.0.0 --save to go from 6.3.0 to 7.0.0

hexo-abbrlink                       😕  NOTUSED?  Still using hexo-abbrlink?
                                                 Depcheck did not find code similar to require('hexo-abbrlink') or import from 'hexo-abbrlink'.
                                                 Check your code before removing as depcheck isn't able to foresee all ways dependencies can be used.
                                                 Use rc file options to remove unused check, but still monitor for outdated version:
                                                     .npmcheckrc {"depcheck": {"ignoreMatches": ["hexo-abbrlink"]}}
                                                 Use --skip-unused to skip this check.
                                                 To remove this package: npm uninstall hexo-abbrlink --save

hexo-algoliasearch                  😎  MAJOR UP  Major update available. https://github.com/LouisBarranqueiro/hexo-algoliasearch#readme
                                                 npm install hexo-algoliasearch@2.0.1 --save to go from 1.0.0 to 2.0.1
                                    😕  NOTUSED?  Still using hexo-algoliasearch?
                                                 Depcheck did not find code similar to require('hexo-algoliasearch') or import from 'hexo-algoliasearch'.
                                                 Check your code before removing as depcheck isn't able to foresee all ways dependencies can be used.
                                                 Use rc file options to remove unused check, but still monitor for outdated version:
                                                     .npmcheckrc {"depcheck": {"ignoreMatches": ["hexo-algoliasearch"]}}
                                                 Use --skip-unused to skip this check.
                                                 To remove this package: npm uninstall hexo-algoliasearch --save
# 后续省略……
```

可以看到，所以依赖项最新版本都已列出，并且给出了升级命令。

## 5. `npm install -g npm-upgrade`, 安装 npm-upgrade，若已安装可以跳过

```sh
PS D:\workspace\blog\github-blog> npm install -g npm-upgrade
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated @npmcli/move-file@1.1.2: This functionality has been moved to @npmcli/fs
npm WARN deprecated @npmcli/ci-detect@1.4.0: this package has been deprecated, use `ci-info` instead
npm WARN deprecated libnpmconfig@1.2.1: This module is not used anymore. npm config is parsed by npm itself and by @npmcli/config
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142

added 374 packages, and audited 376 packages in 55s

11 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## 6. `npm-upgrade`, 更新 package.json

```sh
PS D:\workspace\blog\github-blog> npm-upgrade
Checking for outdated production, optional, development, peer and bundled dependencies for "D:\workspace\blog\github-blog\package.json"...
[====================] 24/24 100%

New versions of active modules available:

  hexo                   ^6.3.0   →   ^7.0.0
  hexo-algoliasearch     ^1.0.0   →   ^2.0.1
  hexo-renderer-stylus   ^2.1.0   →   ^3.0.0
  hexo-theme-landscape   ^0.0.3   →   ^1.0.0
  hexo-deployer-git      ^3.0.0   →   ^4.0.0

? Update "hexo" in package.json from ^6.3.0 to ^7.0.0? Yes

? Update "hexo-algoliasearch" in package.json from ^1.0.0 to ^2.0.1? Yes
#此处省略……
? Update package.json? Yes
```

所有升级项已列出，需要输入回车，最后一项 `Update package.json` 需要输入 `y` 或 `yes`, 然后回车。
此时可以看到 `package.json` 里所有依赖项都已升级，但是 `hexo` 的版本还是 `6.3.0`。

```json
  "hexo": {
    "version": "6.3.0"
  },
  "dependencies": {
    "hexo": "^7.0.0",
  }
```

## 7. `npm update --save`，升级系统项

```sh
PS D:\workspace\blog\github-blog> npm update --save
npm WARN cli npm v10.2.4 does not support Node.js v16.20.2. This version of npm supports the following node versions: `^18.17.0 || >=20.5.0`. You can find the latest version at https://nodejs.org/.
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'hexo-algoliasearch@2.0.1',
npm WARN EBADENGINE   required: { node: '>=18' },
npm WARN EBADENGINE   current: { node: 'v16.20.2', npm: '10.2.4' }
npm WARN EBADENGINE }
npm WARN deprecated source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated

added 99 packages, removed 74 packages, changed 89 packages, and audited 538 packages in 1m

37 packages are looking for funding
  run `npm fund` for details

19 vulnerabilities (2 low, 4 moderate, 8 high, 5 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## 8. 查看package.json, hexo 的版本由 6.3.0 已变成 7.0.0

运行 `hexo -v` 再次查看：

```sh
PS D:\workspace\blog\github-blog> hexo version
INFO  Validating config
INFO
# ……
hexo: 7.0.0
```

## 9. `npm update hexo-theme-butterfly --save`, 升级主题，运行 `hexo server`，查看你的博客

```sh
PS D:\workspace\blog\github-blog> hexo server
INFO  Validating config
INFO
  ===================================================================
      #####  #    # ##### ##### ###### #####  ###### #      #   #
      #    # #    #   #     #   #      #    # #      #       # #
      #####  #    #   #     #   #####  #    # #####  #        #
      #    # #    #   #     #   #      #####  #      #        #
      #    # #    #   #     #   #      #   #  #      #        #
      #####   ####    #     #   ###### #    # #      ######   #
                            4.11.0
  ===================================================================
INFO  Start processing
```

**升级完成，nice 😊**

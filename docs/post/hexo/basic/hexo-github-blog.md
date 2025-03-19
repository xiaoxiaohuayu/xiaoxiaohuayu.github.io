---
title: GitHub + Hexo 搭建个人博客网站
description: 这篇文章介绍了如何使用GitHub和Hexo搭建个人博客网站。内容包括注册GitHub账号、创建仓库、安装Hexo、生成博客模板、配置主题以及将本地博客部署到GitHub Pages上。通过这些步骤，用户可以快速建立属于自己的博客网站
firstCommit: 2022-11-29 14:55:01+8:00
lastUpdated: 2023-12-14 16:46:23+8:00
tags:
  - Hexo
  - Github
---

# GitHub + Hexo 搭建个人博客网站

> `GitHub Pages` 提供免费的静态网站托管服务，无需支付额外费用。
>
> `Hexo` 生成的静态文件可以直接部署到 `GitHub Pages`，过程简单快捷。

使用 `GitHub + Hexo` 可以零成本且快速搭建属于自己的博客

## 一、提前了解

- [github](https://github.com/)，开源代码托管网站，需要我们去注册一个账号。
- [hexo](https://hexo.io/zh-cn/docs/)，一个快速、简洁且高效的博客框架，需要我们去提前了解一些搭建文档。
- [git](https://git-scm.com/)，本地安装 `git` 工具，实现代码提交和推送。
- [nodejs](https://nodejs.org/zh-cn/)，本地安装 `nodejs`，`Hexo` 基于 `nodejs` 编写的。

**以上软件的安装，请自行搜索**

## 二、`github` 上创建仓库

### 1. 新建仓库

![image](https://www.helloimg.com/i/2024/12/30/6772bd7b29074.png)

### 2. 填写地址

仓库名称为 `<用户名>.github.io`，勾上 `Add a README file`。
![image](https://www.helloimg.com/i/2024/12/30/6772bd7c72993.png)

> 提示，用户名为你自己的 `github` 帐号，见下图。
> ![image](https://www.helloimg.com/i/2024/12/30/6772bd7d7258f.png)

### 3. 访问

访问地址 `https://<用户名>.github.io`，如图则说明创建成功。
![image](https://www.helloimg.com/i/2024/12/30/6772bd7b879ac.png)

## 三、本地安装 `Hexo`，生成博客模板

### 1. 安装 `Hexo`

打开cmd，执行

```sh
npm install -g hexo-cli
```

查看 `Hexo` 版本

```sh
hexo -v
```

执行结果如下

```sh
PS C:\Users\Administrator> hexo -v
hexo-cli: 4.3.0
os: win32 10.0.25217
node: 14.21.1
v8: 8.4.371.23-node.87
...
```

### 2. 创建本地博客

切换到工作区域文件夹下，执行

```sh
hexo init github-blog
```

执行结果如下

```sh
PS D:\workspace\blog> hexo init github-blog
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
INFO  Install dependencies
...
22 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
INFO  Start blogging with Hexo!
```

然后初始化

```sh
cd github-blog
npm i
```

安装好后运行，执行

```sh
hexo g
hexo server
```

执行结果

```sh
PS D:\workspace\blog\github-blog> hexo g
INFO  Validating config
INFO  Start processing
INFO  Files loaded in 141 ms
INFO  Generated: archives/index.html
···
INFO  17 files generated in 349 ms
PS D:\workspace\blog\github-blog> hexo server
INFO  Validating config
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/ . Press Ctrl+C to stop.
INFO  Have a nice day
```

浏览器打开 `http://localhost:4000/` 预览，如下图
![image](https://www.helloimg.com/i/2024/12/30/6772bd8749989.png)

## 四、提交本地博客至 `github` 仓库

有两种方式

### 1. 利用 `Hexo` 的部署插件

安装 `hexo-deployer-git`

```sh
npm install hexo-deployer-git -D
```

安装完之后修改根目录的 `_config.yml` 文件，拉到最下面，增加远程仓库地址（自己的），记得保存（`ctrl + s`）。

```yml
deploy:
  type: git
  repo: git@github.com:weizwz/weizwz.github.io.git
  branch: main
```

> 提示，远程仓库地址选择 `ssh` 的，如下图，`HTTPS` 的貌似还需要 `token`（主要是我加完token也没成功。。。）
> ![image](https://www.helloimg.com/i/2024/12/30/6772bd7d6c793.png)

部署到GitHub

```sh
hexo g -d
```

执行成功后，查看 `github` 代码仓是否更新，查看博客地址页面。
![image](https://www.helloimg.com/i/2024/12/30/6772bd88e5c3c.png)

### 2. 直接将 `public` 目录中的文件和目录推送至 `gitHub` 仓库

可参考我的博客 [Git使用记录 - 持续更新](/git/use-log#将本地项目关联到远程仓库) - 将本地项目关联到远程仓库。
记得是 `public` 目录，不是整个项目。如果你把整个项目推送了过去，记得回退。

## 五、主题配置

在 `github` 上搜索 `Hexo theme`，选择自己喜欢的主题，最好选择有详细文档的，这样安装比较方便。以我选择的 [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 为例，具有 `Demo` 演示和详情的文档说明，只需按照文档来安装和配置即可。
参照 [安装文档](https://butterfly.js.org/posts/21cfbf15/) 进行安装配置，基础效果如下
![image](https://www.helloimg.com/i/2024/12/30/6772bd82d4e00.png)
按照文档进行其他配置，最后推送至远端仓库即可。

**然后开始写作欣赏你自己的博客吧！**

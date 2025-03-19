---
title: Git 使用记录 - 持续更新
description: 这篇文章详细介绍了Git的使用方法，包括初始化配置、生成SSH密钥、设置代理、关联远程仓库、切换远程仓库地址、修改分支名称、解决常见错误等内容。文章还提供了具体的命令和操作步骤，帮助用户更好地管理和使用Git
firstCommit: 2022-11-25 11:25:44+8:00
lastUpdated: 2024-03-15 11:32:42+8:00
tags:
  - Git
  - Github
  - 代理
---

# Git 使用记录 - 持续更新

> 本文记录了个人在使用 Git 过程中常用的操作和遇到的问题。内容包括初始化配置、生成SSH密钥、设置代理、关联远程仓库、修改分支名称到解决常见错误等

## 初始化配置

替换下面的实际名称和邮件地址

```sh
git config --global user.name weizwz
git config --global user.email 1124725517@qq.com
```

## 本地生成 `sshkey`

1. 打开git命令工具
   如果没有 `.ssh` 文件夹，则使用 `mkdir .ssh` 去创建，有的话直接执行以下命令：

```sh
cd ~/.ssh
ssh-keygen -t rsa -C "1124725517@qq.com"
···
# 一路回车，出现以下则说明成功
Your identification has been saved in C:\Users\Administrator/.ssh/id_rsa
Your public key has been saved in C:\Users\Administrator/.ssh/id_rsa.pub
···
```

2. 复制 `id_rsa.pub` 内的内容，粘贴至远程 `git` 网站设置。可以使用 `more id_rsa.pub` 打开文件内的内容，手动复制即可。

## 设置代理

如有你有代理的话，可以直接使用代理链接仓库

```cmd
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

只对 `github.com` 使用代理，其他仓库不走代理

```cmd
git config --global http.https://github.com.proxy http://127.0.0.1:7897
git config --global https.https://github.com.proxy http://127.0.0.1:7897
```

取消代理，在 `--global` 后添加 `--unset`

```cmd
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 将本地项目关联到远程仓库

有两种办法：
一. `clone` 项目到本地，然后将本地项目内的文件复制过去，`add` 后推送到远程
二. 合并两个项目

1. 本地项目初始化一个git仓库，并将文件加到新建的git仓库中。如果本地项目已经是一个git仓库了，请跳过这一步。
   ```sh
   git init
   git add .
   git commit -m "commit first project"
   ```
2. 添加新的远程仓库地址，可先通过 `git remote -v` 查看本地是否有仓库地址，没有的话直接添加，有的话通过 `git remote rm origin` 删除。
   ```sh
   git remote add origin xxx
   ```
   ** 建议远程地址，使用 `SSH` 地址，因为有时使用 `https` 地址时会遇到一些鉴权问题。形如 `git@github.com:xxx/xxx.git`。**
3. 拉取下远程内容，注意 `github` 目前主分支名称已由 `master` 修改为 `main`
   ```sh
   git pull origin main
   ```
   如果含有共同文件时需要：
   ```sh
   git merge origin/main
   ```
4. 把本地库的所有内容推送到远程库上
   ```sh
   git push -u origin main
   ```

## 本地切换远程仓库地址

1. `git remote -v` 查看本地远程仓库地址
2. `git remote rm origin` 删除本地仓库地址
3. `git remote -v` 查看本地仓库地址是否删除
4. `git remote add origin xxx` 添加新的远程仓库地址，xxx为新的远程仓库地址
5. `git remote -v` 查看本地更新的仓库地址是否已经生效

## 本地分支名称修改

提交代码时，遇见以下错误

```sh
error: src refspec main does not match any.
error: failed to push some refs to 'xxx.git'
```

查了下，是本地分支名称和远程仓库不匹配，通过以下方式修改

```sh
git branch -m "原名称" "想要推送的远程分支名称"
```

`原名称` 可以通过 `git branch` 查询。

## 修改SSH链接端口

拉取 `github` 的代码时，出现错误

```sh
> git pull --tags origin main
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

原因：拉取方式采用的 `SSH`，然后22端口被防火墙屏蔽了，或者被科学上网工具纂改了DNS解析。
解决方案一：使用https协议；
解决方案二：修改端口为443：

1. 命令行执行 `ssh -T -p 443 git@ssh.github.com`，测试443端口是否可用，示例如下：

```sh
PS C:\Users\Administrator> ssh -T -p 443 git@ssh.github.com
The authenticity of host '[ssh.github.com]:443 ([20.205.243.160]:443)' can't be established.
ED25519 key fingerprint is SHA256:+***************************
This host key is known by the following other names/addresses:
    C:\Users\Administrator/.ssh/known_hosts:1: github.com
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[ssh.github.com]:443' (ED25519) to the list of known hosts.
Hi weizwz! You've successfully authenticated, but GitHub does not provide shell access.
```

2. 给 `~/.ssh/config` 文件里添加如下内容，如果没有 `config` 文件，则新建一个

```txt
# Add section below to it
Host github.com
  Hostname ssh.github.com
  Port 443
```

然后重新 `pull` 代码，则恢复正常

## ssh "permissions are too open"

由于权限太开放，导致错误。重新赋权即可。
设置密钥只能你读取写入

```sh
chmod 600 ~/.ssh/id_rsa
```

或者设置密钥只由你读取（不能写入）

```sh
chmod 400 ~/.ssh/id_rsa
```

通常建议第一种就可以了。然后输入 `ssh -T git@github.com` 验证：

```sh
$ ssh -T git@github.com
Hi weizwz! You've successfully authenticated, but GitHub does not provide shell access.
```

## `fatal detected dubious ownership in repository at`

重装系统后，执行原来仓库下文件时报错

```sh
fatal: detected dubious ownership in repository at 'xxxxx'
```

原因：git新的权限安全策略导致的报错，可以按提示把目录添加到信任列表

```sh
git config --global --add safe.directory "*"
```

## `LF will be replaced by CRLF` 警告

> 背景：
> CR为回车符，LF为换行符。Windows结束一行用CRLF，Mac和Linux用LF。
> core.autocrlf：
> false表示取消自动转换功能。适合纯Windows；
> true表示提交代码时把CRLF转换成LF，签出时LF转换成CRLF。适合多平台协作；
> input表示提交时把CRLF转换成LF，检出时不转换。适合纯Linux或Mac

单人项目：设置 `git config --global core.autocrlf false`，关闭提示即可；
多人协作，确定是结尾用CRLF还是LF，然后将统一转换。

## `您确定要继续连接吗（yes/no）` 或者 `github具有指纹，是否继续(是/否)`

> 在使用Git连接远程服务器时，有时会遇到一个弹窗如上内容，然后一直弹出，特别烦人

解决办法：将远程服务器添加到您信任的主机列表中。使用以下命令：

```
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

示例：

```
ssh-keyscan github.com >> ~/.ssh/known_hosts
# github.com:22 SSH-2.0-babeld-05989c77
# github.com:22 SSH-2.0-babeld-05989c77
# github.com:22 SSH-2.0-babeld-05989c77
# github.com:22 SSH-2.0-babeld-05989c77
# github.com:22 SSH-2.0-babeld-05989c77
```

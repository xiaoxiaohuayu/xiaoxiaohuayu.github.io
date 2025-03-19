---
title: Cygwin，在Windows中使用linux命令
description: 这篇文章介绍了如何在Windows中使用Cygwin来执行Linux命令。内容包括Cygwin的下载安装步骤、配置环境变量的方法，以及如何使用常见的Linux命令如ls和pwd。文章还提到选择国内镜像地址以加快下载速度
firstCommit: 2023-09-22 20:13:00+8:00
lastUpdated: 2023-12-07 17:23:15+8:00
tags:
  - 终端
  - Windows
  - 应用程序
---

# Cygwin，在Windows中使用linux命令

> 习惯了 `linux` 命令的快捷操作，使用 `winodws` 的 `shell` 感觉效率非常低下，于是开始搜寻工具支持。
> 刚开始搜到的是 `GnuWin32`，但是它已经停止更新维护了，于是找到了 `Cygwin`。当然 `Cygwin` 还有其他功能，在此不做赘述

## 下载安装

### 1. 登录 [Cygwin官网下载界面](https://cygwin.com/install.html)，进行下载

![image](https://www.helloimg.com/i/2025/01/02/67763e4762712.png)

### 2. 执行 `setup-x86_64.exe` 安装文件，选择 `从互联网安装`

![image](https://www.helloimg.com/i/2025/01/02/67763e4740ea2.png)

### 3. 选择安装目录，如果想安装到其他盘，请提前新建文件夹

![image](https://www.helloimg.com/i/2025/01/02/67763e49887b5.png)

### 4. 选择本地软件包安装目录

![image](https://www.helloimg.com/i/2025/01/02/67763e48c48de.png)

### 5. 选择互联网连接，使用 `系统代理`

![image](https://www.helloimg.com/i/2025/01/02/67763e48d322a.png)

### 6. 选择下载站点，使用国内镜像地址，`163/aliyun/tencent/huaweicloud` 等

![image](https://www.helloimg.com/i/2025/01/02/67763e4a1d63d.png)

### 7. 选择软件包，这个按需求即可。比如你想使用 `zip` 或者 `unzip` 命令，就搜索 `zip`，然后选中这两个安装包，最后点击 `下一页` 等待安装

![image](https://www.helloimg.com/i/2025/01/02/67763e492b997.png)

### 8. 安装完成

![image](https://www.helloimg.com/i/2025/01/02/67763e498c348.png)

## 配置环境变量

将 `C:\cygwin64\bin` 和 `C:\cygwin64\sbin` 目录添加到环境变量 `Path` 里。其中 `C:\cygwin64` 为 `Cygwin` 实际安装目录，比如我的是 `D:\Tools\cygwin64\bin`
![image](https://www.helloimg.com/i/2025/01/02/67763e4dc7c64.png)

## 使用

尝试使用linux命令，比如 `ls` 和 `pwd` 等
![image](https://www.helloimg.com/i/2025/01/02/67763e4ec6970.png)

---
title: 自用黑苹果问题记录：开机报错/蓝牙/引导
description: 本文记录了作者在使用黑苹果过程中遇到的问题及解决方案，包括系统安装、键盘设置、开机报错、蓝牙连接等方面的详细步骤和注意事项
firstCommit: 2024-01-29 15:50:30+8:00
lastUpdated: 2024-01-29 16:16:29+8:00
tags:
  - MacOS
---

# mac 自用黑苹果问题记录：开机报错/蓝牙/引导

> 台式配置 `i5-7500 + GTX1066`，目前能使用的最高版本是 `macos 10.13.6`，有相当一部分软件已经不支持更新了，比如 `QQ`，`chrome`，当然可以自己找一下之前的旧版本，还是能运行的。

开搞。。。自己搞了 2 天没搞定，之前的 EFI 文件也都在，就是卡 LOGO，懒得折腾了，直接找了万能的淘宝，2 小时搞定。进系统之后还是有些小毛病，特此记录。

## mac 使用外接键盘

由于 mac 按键和其他默认键盘按键不同，需要修改按键设置。

打开系统偏好设置，找到键盘，然后点击键盘选项，选择修饰键，
将左右 Control 键改为 command 键，将左右 Option 键改为 Command 键。

![20240129_173445.png](https://www.helloimg.com/i/2025/01/02/6776ae9e96f13.png)

## 开机报错

您的电脑因出现问题而重新启动，每次开机都会有这个错误。

![20240129_174245.png](https://www.helloimg.com/i/2025/01/02/6776aea03ab97.png)

网上查询，有三种解决办法：

1. 清除 nvram.config，先在 efi 里找，找到的话删除，不行的话，需要清理 BIOS 里的，可以刷 BIOS 或者 复位 BIOS，即拔电后通过跳线、放电解决。我最终是通过这个办法解决了。
2. 在 mac 应用程序里，找到控制台，然后诊断管理，搜索 Sleep Wake Failure，找到后删除即可，但我的里面没有找见。
   ![20240129_175138.png](https://www.helloimg.com/i/2025/01/02/6776ae9fdf256.png)
3. 删除 `EFI/clover/drivers64UEFI` 目录下的 `Emu\*` 开头的文件后，再次重启，烦人的提示就可以去除。但是我试了下，进入 mac 后系统直接卡死。

相关问题： https://bbs.pcbeta.com/viewthread-1788236-1-1.html，https://bbs.pcbeta.com/viewthread-1652538-1-1.html

## 蓝牙不正常，无法连接

目前的网卡是 `Intel 9260 AC`，自带蓝牙，然后网卡驱动生效了，蓝牙开启了，但搜不到。尝试过重装驱动，重启，都没用。最后看到了某个文章，说安装了双系统，在 windows 里连接蓝牙后，macos 这边的蓝牙也好了，这。。。开搞：

## 黑苹果安装后安装 windows

当前正好两个磁盘，一个固态已经安装了 macos，还有个 1T 机械硬盘，内有部分资料，但是 可以开辟出一点来装 win11。

### 1. 制作 U 盘 PE 系统

准备一个大于 16G 内存的 U 盘，下载好 windows 系统镜像，推荐去远景论坛，或者去 [专注于 win10](https://iwin10.net/) 下载，或者文章下评论，我发你也可。
制作 PE 的工具，这里推荐 [微 PE 工具箱](https://www.wepe.com.cn/download.html)

安装教程 [微 PE 优盘使用说明书](https://www.wepe.com.cn/ubook/)。安装好后，将下载好的 windows 镜像放入 U 盘，然后重启电脑，选择从 U 盘进入，进入 PE 系统。

### 2. 机械盘开辟 ESP 引导区

固态的 macos 里有 esp 引导区，为了相互不影响，在机械盘也开辟出一个 esp 引导区。
进入 PE 系统后，打开 DiskGenius 分区工具，先转化机械盘分区表类型为 MBR。

![20240129_171858.png](https://www.helloimg.com/i/2025/01/02/6776ae9af280f.png)

然后在机械盘新建一个分区，大小 200G，用来当系统盘，格式化为 NTFS，然后空出 300M 来当做 esp 引导区。怎么空 300m 空间，就是你在建系统分区的时候，可以选择磁盘的起始扇位和结束扇位，如果你从磁盘末尾开辟系统盘，那你的起始扇位就不要紧挨着前面分区的结束扇位，而是留出 300m 的空间即可。

![20240129_171249.png](https://www.helloimg.com/i/2025/01/02/6776ae9ae4a24.png)

在分出未分配空间的那个磁盘右击，选择 建立 ESP 分区，大小设置为 300m, 然后格式化为 FAT32。

### 3. 安装 windows 系统

打开 windows 安装器，选择镜像，找到你 U 盘里的 iso 镜像，打开；选择引导驱动器，就是刚才新建的 ESP 分区；选择安装磁盘的位置，选择新建的系统分区。然后点击开始安装，等待重启。

![20240129_172424.png](https://www.helloimg.com/i/2025/01/02/6776ae9d5b41f.png)

### 4. 进入系统后，连接蓝牙

这才是我们的目的，windows 的蓝牙一般都是正常的，如果不正常，就去更新下驱动即可。连接一下蓝牙，然后关机重启。

### 5. 修改引导

重启后，发现系统直接进入 windows 了，所以我们需要修改引导，让系统默认进入 MacOS 的引导区。注意，此时是在 windows 系统里操作。这里我们要使用一个工具 EasyUEFI。

![20240129_172731.png](https://www.helloimg.com/i/2025/01/02/6776ae9d50a3d.png)

打开 EasyUEFI，选择 `管理 EFI 启动项`，进入后删除掉里面的 macos，然后新建启动项，描述为 macos，

![20240129_172823.png](https://www.helloimg.com/i/2025/01/02/6776ae9e6a696.png)

选择 macos 分区的 esp 引导区里的 EFI 文件夹，继续进入 BOOT 文件夹，选择 bootx64.efi，点击保存。

![20240129_172907.png](https://www.helloimg.com/i/2025/01/02/6776ae9e1c15f.png)

然后移动刚新建的引导，放在第一位，关闭软件，然后重启。

![20240129_172949.png](https://www.helloimg.com/i/2025/01/02/6776ae9e0d116.png)

电脑再次启动后，发现已进入 macos 的引导，第一项为 macos，第二项为 windows，选择 macos 进入系统。

## clover 自动选择 mac 系统进入

clover 是一个开源的 EFI 引导加载器，可以让 macos 启动更加快速，这里我们要让 clover 自动选择 mac 系统进入。
在 mac 系统里操作，我们需要这个软件 Clover Configurator。打开软件，挂载分区，然后打开分区。

![20240129_164214.png](https://www.helloimg.com/i/2025/01/02/6776ae9bd918c.png)

找到 `EFI > CLOVER > config.plist` 这个文件，右键选择 Clover Configurator 打开。

![20240129_164439.png](https://www.helloimg.com/i/2025/01/02/6776ae9b3d470.png)

打开左侧，引导参数，然后修改默认引导卷名为我们 mac 盘里 esp 分区的名称（注意，这个名称不是我们在访达里看到的名称，而是在选择挂载分区的那里看到的，比如我的是 EFI_MAC on macos，那这个名称就是 on 之后的 macos），修改等待时间，建议 5/3 秒。然后重启电脑，发现 clover 已经可以自动为我们选择 macos 系统进入了。

![20240129_164657.png](https://www.helloimg.com/i/2025/01/02/6776ae9ae0317.png)

进入 macos 后，再查看蓝牙，已正常

![20240129_165400.png](https://www.helloimg.com/i/2025/01/02/6776ae9aca74d.png)

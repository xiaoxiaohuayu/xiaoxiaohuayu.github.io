---
title: OPPO主题组件开发 - 调试与预览
description: 本文介绍了如何调试和预览OPPO主题组件。主要内容包括：PC端下载adb命令工具并配置环境变量，手机端安装多彩引擎并连接电脑，通过adb命令测试连接、创建widget文件夹、发送组件包到手机，以及手机端预览组件。还介绍了其他常用adb命令和连接OPPO远程真机的方法
firstCommit: 2023-09-25 14:14:00+8:00
lastUpdated: 2023-12-14 11:04:06+8:00
tags:
  - OPPO
  - Windows
---

# OPPO主题组件开发 - 调试与预览

> 本篇作为 [OPPO主题组件调试与预览](https://open.oppomobile.com/new/developmentDoc/info?id=12221) 文档的补充，因为它真的很简单而且太老，一些命令已发生变化😪

![image](https://www.helloimg.com/i/2025/01/02/677642d50c4b7.png)

_此图片来自官网_

## 一、调试前准备

### 1. `PC` 端下载 `adb命令工具`

1. **下载**
   下载地址 [https://adbdownload.com/](https://adbdownload.com/)，或从其他地方下载也可
2. **解压，放在你想放的文件夹下**
3. **配置环境变量**
   右键 `我的电脑/此电脑` 选择 `属性`，在弹出的面板里选择 `高级系统设置`
   ![image](https://www.helloimg.com/i/2025/01/02/677642d54b705.png)
   在弹出的面板里，选择 `环境变量`，在弹出的面板里找到 `Path`，点击 `编辑`
   ![image](https://www.helloimg.com/i/2025/01/02/677642d605f7d.png)
   在弹出的面板里，选择 `新建`，在新建的空白行内填入，你解压后的文件夹地址，比我的是 `D:\Tools\windows\platform-tools`
   ![image](https://www.helloimg.com/i/2025/01/02/677642d48efcc.png)
   最后一步步`确定`，关闭所有面板
4. **测试**
   打开命令行工具，输入 `adb`，出现如下，则表示安装成功
   ![image](https://www.helloimg.com/i/2025/01/02/677642d3ab872.png)

### 2. 手机端安装 `多彩引擎`

下载地址参见 `https://open.oppomobile.com/new/developmentDoc/info?id=12221`，下载后安装到手机上

### 3. 手机连接电脑

1. **手机找到 `开发者选项`**
   没这个选项的话，请打开手机 `设置` -> `关于本机` -> `版本信息`，然后持续点击 `版本号`，直至出现类似 `您现在已处于开发者模式` 的提示即可。然后在 `设置` -> `其他设置` 下即可找到 `开发者选项`
   ![image](https://www.helloimg.com/i/2025/01/02/677642d41c849.png)
2. **打开开发者选项里的 `USB调试`**
   出现提示，请点击 `确定`
   ![image](https://www.helloimg.com/i/2025/01/02/677642d67e404.png)
3. **手机通过 `USB` 数据线连接电脑**
   连接无反应的，请检查接口或换线
   连接后，选择 `传输文件`
   ![image](https://www.helloimg.com/i/2025/01/02/677642d6d7aa6.png)
   弹出框提示`允许USB调试吗`，请选择 `允许`
   ![image](https://www.helloimg.com/i/2025/01/02/677642d74ce96.png)

**经历以上步骤，则准备工作已做好**

## 二、`adb` 调试和预览

> 打开 `cmd` 命令工具，开始进行调试

### 1. 测试是否连接正常

输入 `adb devices`，出现下列情况，则说明连接正常，如果没有 `device` 和它前面的id，则说明连接不成功

```sh
PS C:\Users\Administrator> adb devices
List of devices attached
8d58ec40        device
```

### 2. 创建手机端的 `widget` 文件夹

输入 `adb sh mkdir /sdcard/Android/data/com.heytap.colorfulengine/files/widget`，因为我已创建过，所以它提示已存在
_关于命令中间 `com.heytap.colorfulengine` 这个地址，可以打开 `多彩引擎` 软件，最上面有提示_

```sh
PS C:\Users\Administrator> adb sh mkdir /sdcard/Android/data/com.heytap.colorfulengine/files/widget
mkdir: '/sdcard/Android/data/com.heytap.colorfulengine/files/widget': File exists
```

### 3. 将创建的组件包发送到手机

如果你还没有创建自己的组件，可以先下载官方示例里 [模板包](https://open.oppomobile.com/new/developmentDoc/info?id=12225)，下载后重新命名简短点，然后 `cd` 到当前目录(或在当前目录右键打开 `cmd` 命令)执行发送命令 `adb push xxx.zip /sdcard/Android/data/com.heytap.colorfulengine/files/widget`。`xxx.zip` 请修改为具体你命名的文件名。

```sh
PS D:\workspace\2023\oppoTheme\oppowidget> adb push system.zip /sdcard/Android/data/com.heytap.colorfulengine/files/widget
system.zip: 1 file pushed, 0 skipped. 131.9 MB/s (240171 bytes in 0.002s)
```

出现以上提示，则表明发送成功

### 4. 手机端打开 `多彩引擎` 软件

点击新出现的压缩包，出现组件预览，然后 `添加到桌面` 即可
![image](https://www.helloimg.com/i/2025/01/02/677642d81bf3b.png)

## 三、开发者进阶

### 1. 其他常用的 `adb` 命令

安装本地APK软件

```sh
adb install xxx.apk
```

删除手机上的组件文件

```sh
adb sh rm /sdcard/Android/data/com.heytap.colorfulengine/files/widget/xxx.zip
```

卸载手机软件请参考其他博文 [使用adb安装或卸载卸载手机系统应用](https://zhuanlan.zhihu.com/p/598860531)

### 2. 连接OPPO远程真机

> 请先查看 [OPPO远程真机的官方介绍](https://open.oppomobile.com/new/introduction?page_name=cloudmachine)

![image](https://www.helloimg.com/i/2025/01/02/677642d7d83a7.png)
前2步进行完毕后，执行以下命令

```sh
# 执行云真机连接命令，输入账号和密码，连接可用端口，比如23008，提示`failed to authenticate to 127.0.0.1:23008`不用理会是正常的
adb connect 127.0.0.1:14243
# 安装测试软件
adb install ColorfulEngine#Widget_13.0.62-Test-20230829-315979231.apk
# 安装完成后，其余操作和本地连接手机相同，推送组件然后查看
adb push xxx.zip /sdcard/Android/data/com.heytap.colorfulengine/files/widget
# 断开连接
adb disconnect 127.0.0.1:14243
```

### 3. PC端集成 `组件打包/删除/压缩` 命令

> 请查看我的另一篇博文 [Cygwin，在windows中使用linux命令](/windows/setting/cygwin-to-linux-command.md)

安装 `Cygwin` 后，整个调试流程示例如下：

```sh
# 如果旧压缩包，先删除
rm .\xxx.zip
# 压缩组件包
zip -r xxx.zip .\system\
# 推送压缩包到手机
adb push xxx.zip /sdcard/Android/data/com.heytap.colorfulengine/files/widget
```

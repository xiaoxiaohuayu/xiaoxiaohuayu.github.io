---
title: Windows开发环境备份，再也不怕重装系统了
description: 这篇文章介绍了如何在重装Windows系统后快速恢复开发环境。主要内容包括：软件安装在非系统盘，环境变量恢复，Win11环境优化，以及常用软件恢复。通过这些步骤，可以避免每次重装系统后重新配置环境的繁琐过程
firstCommit: 2023-10-25 22:19:32+8:00
lastUpdated: 2024-06-06 23:47:24+8:00
tags:
  - Windows
  - 终端
  - Node.js
---

# Windows开发环境备份，再也不怕重装系统了

> 每次重装系统后，都要重新安装软件，配置环境变量，极为繁琐。故作环境环境变量备份，常用软件恢复记录，前提是你的软件要安装在非系统盘，D/E盘等

## 软件安装在非系统盘

开发软件安装在非系统盘，建好目录。重装系统后，只是重置系统盘，所以这些软件不需要重新安装。
譬如 `java` 相关目录：

```sh
PS D:\java> ls
    Directory: D:\java
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2023/9/27    15:28                jdk
d----          2023/10/11    23:45                maven
d----           2023/9/27    17:29                mysql
d----           2023/4/11    23:31                nginx
d----           2023/9/27    17:11                Tomcat
d----          2023/10/11    22:55                UJCMS
```

譬如 `node` 相关目录：

```sh
PS D:\node> ls
    Directory: D:\node
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
l----           2023/5/29    19:52                nodejs -> D:\node\nvm\v14.21.1
d----           2023/5/29    19:51                nvm
d----           2022/12/3    21:01                pnpm
```

其他 `git`、`python` 等：

```sh
PS D:\develop> ls
    Directory: D:\develop
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           2022/12/6    21:03                Anaconda3
da---          2023/10/18    22:38                DBeaver
d----            2023/5/4    20:34                ffmpeg-master-latest-win64-gpl
d----            2023/6/1    17:21                Git
d----           2023/6/19    13:03                HeyTapThemeEditor
d----          2023/10/15    11:20                HskDDNS
d----           2019/4/13    17:24                MongoDB
d----           2023/6/10    14:50                python
d----          2023/10/11    18:20                WPS Office
```

## 环境变量恢复

主要是恢复环境变量里的 `Path` 值，将相关CMD指令导向具体软件位置

### 1. 先新建系统变量，将以下需要的公共变量填入

<!-- ![image](/img/blog/20231025_1.png) -->
![image](https://www.helloimg.com/i/2025/01/02/6776616e79f4c.png)

| 变量名(N)     | 变量值(V)                           | 备注   |
| ------------- | ----------------------------------- | ------ |
| CATALINA_HOME | D:\java\Tomcat\apache-tomcat-8.5.93 | Tomcat |
| JAVA_HOME     | D:\java\jdk\                        | JDK    |
| NVM_HOME      | D:\node\nvm                         | nvm    |
| NVM_SYMLINK   | D:\node\nodejs                      | nvm    |

### 2. 修改 `Path` 变量

点击如下图所示的 `编辑文本` 按钮，可以整行输入所有 `path` 变量值

![image](https://www.helloimg.com/i/2025/01/02/6776616feb12d.png)

粘贴后，请将无用的变量值删除

```txt
D:\java\jdk\bin\;D:\develop\python\Scripts\;D:\develop\python\;%NVM_HOME%;%NVM_SYMLINK%;D:\develop\Git\cmd;D:\Tools\微信web开发者工具\dll;D:\Tools\OpenSSH\bin;D:\Tools\cygwin64\bin;D:\Tools\cygwin64\sbin;D:\Tools\windows\platform-tools;%CATALINA_HOME%\lib;%CATALINA_HOME%\bin;
```

或者参考以下文本，按个人使用情况单行输入保存

```txt
D:\java\jdk\bin\;
D:\develop\python\Scripts\;
D:\develop\python\;
%NVM_HOME%;
%NVM_SYMLINK%;
D:\develop\Git\cmd;
D:\Tools\微信web开发者工具\dll;
D:\Tools\OpenSSH\bin;
D:\Tools\cygwin64\bin;
D:\Tools\cygwin64\sbin;
D:\Tools\windows\platform-tools;
%CATALINA_HOME%\lib;
%CATALINA_HOME%\bin;
```

恢复后，就可以验证相关CMD命令是否正常了，如

```sh
PS C:\Users\Administrator> java -version
openjdk version "1.8.0_382"
OpenJDK Runtime Environment (Zulu 8.72.0.17-CA-win64) (build 1.8.0_382-b05)
OpenJDK 64-Bit Server VM (Zulu 8.72.0.17-CA-win64) (build 25.382-b05, mixed mode)
```

## win11环境优化

![image](https://www.helloimg.com/i/2025/01/02/6776616d53a08.png)

### 1. 右键菜单恢复成win10样式

新建 `txt` 文件，复制以下内容，存入后保存，修改文件后缀为 `.cmd`，然后双击执行或右键打开

```sh
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
taskkill /f /im explorer.exe & start explorer.exe
```

恢复win11菜单，同理

```sh
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
taskkill /f /im explorer.exe & start explorer.exe
```

### 2. 任务栏一键居左

新建 `txt` 文件，复制以下内容，存入后保存，修改文件后缀为 `.reg`，然后双击执行或右键合并

```sh
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced]
"TaskbarAl"=dword:00000000
```

任务栏一键居中，同理

```sh
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced]
"TaskbarAl"=dword:00000001
```

### 3. win11文件管理器修改

删除win11资源管理器左侧图库，方法同2

```sh
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Classes\CLSID\{e88865ea-0e1c-4e20-9aa6-edcd0212c87c}]
"System.IsPinnedToNameSpaceTree"=dword:00000000
```

删除win11资源管理器左侧主文件夹菜单，方法同2

```sh
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer]
"HubMode"=dword:00000001
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace_36354489\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}]
```

如果你有使用 `adobe` 软件的话，资源管理器左侧一定有烦人的 `creative cloud` 文件夹，删除它，方法同2

```sh
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\CLSID\{0E270DAA-1BE6-48F2-AC49-13368E230FC4}]
"System.IsPinnedToNameSpaceTree"=dword:00000000
```

### 4. 去除桌面快捷方式的箭头

新建 `txt` 文件，复制以下内容，存入后保存，修改文件后缀为 `.bat`，然后右键打开

```sh
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\sh Icons" /v 29 /d "%systemroot%\system32\imageres.dll,197" /t reg_sz /f
taskkill /f /im explorer.exe
attrib -s -r -h "%userprofile%\AppData\Local\iconcache.db"
del "%userprofile%\AppData\Local\iconcache.db" /f /q
start explorer
pause
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\sh Icons" /v 29 /d "%systemroot%\system32\imageres.dll,197" /t reg_sz /f
taskkill /f /im explorer.exe
attrib -s -r -h "%userprofile%\AppData\Local\iconcache.db"
del "%userprofile%\AppData\Local\iconcache.db" /f /q
start explorer
pause
```

## 常用软件恢复

### 1. win11轻松设置

Windows11轻松设置 是一款第三方软件，旨在帮助用户更轻松地配置和优化Windows 11的各种设置。推荐去 `bilibili` 或 `远景论坛` 搜索下载。

![image](https://www.helloimg.com/i/2025/01/02/677661704d426.png)

### 2. 解压缩软件 `WinRAR`

请自行搜索安装报，或去 [官网](https://www.rarlab.com/download.htm) 下载

![image](https://www.helloimg.com/i/2025/01/02/6776616f80740.png)

### 3. 命令行工具 `Windows Terminal`

打开应用商店 `Microsoft Store`，搜索 `Terminal` 后，点击安装

![image](https://www.helloimg.com/i/2025/01/02/67766173e0d00.png)

### 4. `office` 套件

安装 [Office Tools PLus](https://otp.landian.vip/zh-cn/) 软件，一键部署

![image](https://www.helloimg.com/i/2025/01/02/6776617c60ccc.png)

激活，关闭安全软件，使用 `HEU_KMS_Activator_v30` 激活，此软件下载请自行搜索

### 5. `Adobe` 系列软件，如 `PS`

请自行下载安装包，或去官网安装 [Adobe Creative Cloud](https://www.adobe.com/cn/lead/creativecloud/business.html) 后（点击 `试用`，下载安装），可打开此软件安装一系列设计软件

![image](https://www.helloimg.com/i/2025/01/02/67766175b7db0.png)

激活，关闭安全软件，使用 `Adobe GenP 3.0` 激活，，此软件下载请自行搜索

### 6. 截图工具 `Snipaste` 或者 `PixPin`

打开应用商店 `Microsoft Store`，搜索 `Snipaste` 或者 `PixPin` 后，点击安装

![image](https://www.helloimg.com/i/2025/01/02/6776617571f8e.png)

### 7. 其他软件

- [listary windows搜索软件](https://www.listary.com/)
- [Notepad-- 国产跨平台、轻量级的文本编辑器](https://gitee.com/cxasm/notepad--/tags)
- [vscode编辑器](https://code.visualstudio.com/)
- [mysql数据库](https://dev.mysql.com/downloads/installer/)
- [tomcat](https://tomcat.apache.org/)
- [Azul Zulu 开源 OpenJDK 构建](https://www.azul.com/downloads/#zulu)
- [IDEA](https://www.jetbrains.com/zh-cn/idea/)，[激活参考](https://www.exception.site/essay/idea-yongjiu-jihuoma)

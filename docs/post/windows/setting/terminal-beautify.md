---
title: Windows cmd 终极美化
description: 本文介绍了如何美化 Windows Terminal，包括安装 Windows Terminal 和 PowerShell、安装 Nerd Fonts 字体、安装 oh-my-posh 主题、使用自定义主题以及在其他编辑器中使用这些设置。文章提供了详细的步骤和相关链接，帮助用户实现终端美化
firstCommit: 2023-12-18 14:21:31+8:00
lastUpdated: 2024-06-06 23:25:13+8:00
tags:
  - 终端
  - Windows
  - 字体
---

# Windows cmd 终极美化

`Windows Terminal` 是一个现代化的终端应用程序，支持多标签页和多种命令行工具（如 PowerShell 和 WSL）。它提供了丰富的自定义选项，包括主题、字体和配色方案，借助于此应用，可以提升我们的体验和生产力

## 效果

<!-- ![image](/img/blog/20231218_143809.png) -->
![20231218_143809.png](https://www.helloimg.com/i/2025/01/02/67768685e62d0.png)

## 实现

### 1. 安装 `Windows Terminal`

直接在 `Microsoft Store` 中安装即可

![20231218_144200.png](https://www.helloimg.com/i/2025/01/02/67768686ea222.png)

打开 `Windows Terminal`，依次打开 `设置` -> `启动`，选择默认终端为 `Windows Terminal`，然后保存

![20231218_144723.png](https://www.helloimg.com/i/2025/01/02/677686862651b.png)

### 2. 安装 `Powershell`，非强迫症略过这一步

因为不安装，每次打开 `Windows Terminal`，总提示 `Install the Latest Power sh for new features and improvement shttps://aka.ms/pswindows`。
安装也很简单，直接在 `Microsoft Store` 中安装即可

![20231218_145750.png](https://www.helloimg.com/i/2025/01/02/67768688d33dd.png)

打开 `Windows Terminal`，依次打开 `设置` -> `默认配置文件`，选择 `Powersh`，然后保存，后续打开再不会有此提示了

![20231218_145937.png](https://www.helloimg.com/i/2025/01/02/67768685efcdb.png)

### 3. 安装 `Nerd Fonts`

安装此字体是为了支持后续的字体图标显示。当然如果后面的 `oh-my-posh` 主题中没有使用字体图标，那么不安装这些字体也是可以的，参考目录 `其他` -> `2. 不使用 Nerd Fonts 字体`
打开 `https://www.nerdfonts.com/font-downloads`，安装你想要的字体，这里我使用的是 `FiraCode Nerd Font`
如果打不开此网站的话，推荐百度网盘

```txt
链接: https://pan.baidu.com/s/1XwarSrO_-kjgehaMSB6VgQ 提取码: kncf 复制这段内容后打开百度网盘手机App，操作更方便哦
```

打开 `Windows Terminal`，依次打开 `设置` -> `Powersh`-> `外观` -> `字体`，选择 `FiraCode Nerd Font` 后保存

![20231218_152523.png](https://www.helloimg.com/i/2025/01/02/677686897588b.png)

### 4. 安装 `oh-my-posh`

同上，直接在 `Microsoft Store` 中安装

![20231218_150152.png](https://www.helloimg.com/i/2025/01/02/67768686bcb0f.png)

安装好后，在命令行里执行 `$profile`，查看 `Windows Terminal` 的配置目录

```bash
$ $profile
C:\Users\weizwz\Documents\Powersh\Microsoft.Powersh_profile.ps1
```

默认目录如上，如果没有这个文件的话，就去新建一个（包括文件夹）。
然后修改文件，增加一行内容 `oh-my-posh init pwsh | Invoke-Expression` 然后保存。
或者在命令行执行 `notepad $PROFILE`，也会打开刚新建的文件，新增 `oh-my-posh init pwsh | Invoke-Expression` 后保存。
然后重新打开 `Windows Terminal`，即可看到配置已生效

> 应用商店安装 `on-my-posh` 失败的，可以尝试使用 `winget` 安装:
> 先替换国内镜像，以管理员身份运行终端：

```bash
winget source remove winget
winget source add winget https://mirrors.ustc.edu.cn/winget-source
```

然后普通身份运行终端 `winget install JanDeDobbeleer.OhMyPosh` 即可。

### 5. 使用自定义主题

1. 打开 [ohmyposh 主题集合](https://ohmyposh.dev/docs/themes)，选择你想要的主题，然后保存到本地。
2. 命令行执行 `notepad $PROFILE`，修改配置 `oh-my-posh init pwsh --config '你的主题文件位置' | Invoke-Expression`。示例：

```
oh-my-posh init pwsh --config 'D:/data/Powersh/amro.omp.json' | Invoke-Expression
```

此处也可使用远程地址（比如：https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/amro.omp.json ），但是由于网络原因一般不推荐。3. 保存后，重启 `Windows Terminal`，即可生效。

### 6. 在其他编辑器使用

如果其他编辑器中有使用到cmd，那么也需要设置你的编辑器字体为 `FiraCode Nerd Font`，否则命令行会出现乱码，比如 vscode

![20231218_153358.png](https://www.helloimg.com/i/2025/01/02/67768689c5163.png)

## 其他

### 1. `oh-my-posh` 主题快速存储到本地

打开 https://ohmyposh.dev/docs/themes ，复制你喜欢的主题名称
然后将 https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json 中的末尾 `schema.json` 替换为 `主题名称.omp.json`，`ctrl`+`s` 即可快速保存到本地。比如我的当前主题 `markbull`：

![20231218_161649.png](https://www.helloimg.com/i/2025/01/02/6776868973319.png)

对应的文件地址为：
https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/markbull.omp.json

### 2. 不使用 `Nerd Fonts` 字体

`oh-my-posh` 主题中有些主题并不使用图标字体，整体也比较简洁

![20231218_162541.png](https://www.helloimg.com/i/2025/01/02/6776868a79733.png)

如图中的 `zash` 主题 https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/zash.omp.json 。此外还有 `remk` 、`huvix` 等主题，您可以自行去 https://ohmyposh.dev/docs/themes 上查找。

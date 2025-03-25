---
title: 定制你的清爽Mac版Edge浏览器
description: 本文介绍了如何定制Mac版Edge浏览器，包括禁用更新、禁用告警、关闭诊断、优化新标签页等功能的详细步骤和配置方法
firstCommit: 2024-02-03 21:03:47+8:00
lastUpdated: 2024-02-05 11:12:32+8:00
tags:
  - MacOS
  - 浏览器
---

# 定制你的清爽Mac版Edge浏览器

> 浏览器每次打开都有个烦人的提示`要获取将来的 microsoft edge 更新，需要 macos 10.15 或更高版本`，找了很久也没有解决办法，有 windows 端的解决方案，有禁止更新的解决方案，就是没有 Mac 上如何避免这个告警的方案，于是走上 Edge 定制化之旅。

## 效果

使用前后对比

![mac_edge_clear.png](http://sto1fqpd6.hn-bkt.clouddn.com/677744340610b.png)

## 省流

直接下载下面的 `com.microsoft.Edge.customized.mobileconfig` 文件，安装后重启 Edge 即可。

```txt
链接: https://pan.baidu.com/s/15ojiAdmDjzVczj_Whqk09Q 提取码: bh6d
```

安装流程： `右键文件 -> 打开`，或者 `双击文件`
选择 `继续`

![20240203_212128.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777442ecdaa6.png)

选择 `安装`

![20240203_212152.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777442ea9cae.png)

安装完成后，重启浏览器即可。

## 功能

此配置文件的主要功能：**禁用更新，禁用告警，关闭诊断，优化新标签页** 等。所有的配置项，可在安装完此配置后，在 Edge 浏览器地址栏输入 `about://policy` 后打开查看。点击策略名称，会跳转到相应地址，描述此策略。

![20240203_213512.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777442e9e3ed.png)

如果你想修改此配置中的任意选项或者新增选项，可以打开此地址 [admx.help](https://admx.help/?Category=EdgeChromium&Language=zh-cn)，找到对应配置项(以`启用新标签页的预加载以提高呈现速度`为例)后点击打开：

![20240203_214407.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777442ec5f9e.png)

找到 `Value Name` 和 `Value` 对应的值

![20240203_214622.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777442ec652d.png)

然后用 `文本编辑器` 或其他编辑器打开此配置文件，新增的话，就在 `<key>PayloadContent</key> <array> <dict>` 这层标签内容新增 `key 标签`，标签内容对应在上图中找到的 `Value Name` 值，然后新增一行 `<true/>` 或者 `<false/>`。true 对应 `Value==1`，false 对应 `Value==0`。

![20240203_215000.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777443260b6e.png)

如果有多个 `Value` 值，就不能用 `true` 或者 `false` 标签了，而是用 `<integer>xxx</integer>`，xxx 的内容对应其 `Value` 值。

![20240203_220255.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777443294ede.png)

修改的话，就直接搜索此配置项的名称，然后直接修改值即可，修改值的方式同上。

**修改后保存，重启安装即可生效。**

## 删除

进入 `mac系统偏好设置` -> `描述文件`，然后 `-` 掉此配置即可。

![20240203_214038.png](http://sto1fqpd6.hn-bkt.clouddn.com/6777442ea2ec1.png)

## 说明

### 官方说明

Edge 官方说明 [在 macOS 上配置 Microsoft Edge 策略](https://learn.microsoft.com/zh-cn/deployedge/configure-microsoft-edge-on-mac)。

按照官方说法，是先创建 `plist`，在 `plist` 文件里集成 Edge 的策略配置，然后使用首选的 `MDM` 提供程序，将 `plist` 部署到用户的 Mac 设备，过程复杂且麻烦。

### 第三方工具

Mac 用户社区维护了一个 [ProfileManifests](https://github.com/ProfileCreator/ProfileManifests) 项目，旨在为管理员提供一个通用框架，使其能够轻松配置和管理 Apple 产品和支持的第三方软件中的任何可用设置。在此基础上，产生了 [ProfileCreator](https://github.com/ProfileCreator/ProfileCreator) 和 [iMazing Profile Editor](https://imazing.com/profile-editor) 等第三方配置文件制作工具。借助三方工具，使得我们能够更高效的配置 Edge 的策略。以 `iMazing Profile Editor` 为例：

安装 `iMazing Profile Editor` 后打开，先在 `General` 里填入必填项

![20240203_234511.png](http://sto1fqpd6.hn-bkt.clouddn.com/67774433acbc2.png)

然后在左侧列表，找到 Edge 后点击，在右侧面板里选择 `+ Add Configuration Payload`

![20240203_234626.png](http://sto1fqpd6.hn-bkt.clouddn.com/67774433a472b.png)

然后，就会出现 Edge 的各种配置项，选择你想要编辑的配置项即可。

![20240203_234809.png](http://sto1fqpd6.hn-bkt.clouddn.com/67774434228a6.png)

编辑好后，保存，就会生成后缀为 `.mobileconfig` 的可安装文件。最后安装此文件即可。

### 其他软件

此方法也适用于 `chrome` 浏览器，只不过你要去寻找 chrome 的相关策略，另外在使用工具 `iMazing Profile Editor` 时，name 就是 `com.google.Keystone`，相关网址 [管理 Chrome 更新 (Mac)](https://support.google.com/chrome/a/answer/7591084?sjid=17692709497751188162-AP)。值得让人惊喜的是，去除 chrome 更新和禁止警告的配置，我也放在开头的网盘里了，下载安装即可。

当然以上工具和配置方法也适用于其他第三方软件。

### windows 平台

windows 平台直接去修改注册表就好了，百度搜索很多的。

### 配置源码

最后，附上我的配置文件源码：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadDisplayName</key>
      <string>Microsoft Edge</string>
      <key>PayloadIdentifier</key>
      <string>com.microsoft.Edge.13D4EE1D-74BF-4963-AE69-88E61F9FD9EA</string>
      <key>PayloadType</key>
      <string>com.microsoft.Edge</string>
      <key>PayloadUUID</key>
      <string>AB70BBA2-D881-4C1A-8E36-9EE591429F3E</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>AddressBarMicrosoftSearchInBingProviderEnabled</key>
      <false/>
      <key>AutofillCreditCardEnabled</key>
      <false/>
      <key>AutoplayAllowed</key>
      <false/>
      <key>BingAdsSuppression</key>
      <true/>
      <key>BuiltInDnsClientEnabled</key>
      <false/>
      <key>ComponentUpdatesEnabled</key>
      <false/>
      <key>SuppressUnsupportedOSWarning</key>
      <true/>
      <key>InstallDefault</key>
      <false/>
      <key>UpdateDefault</key>
      <false/>
      <key>AutoUpdateCheckPeriodMinutes</key>
      <integer>43200</integer>
      <key>UpdatesSuppressedStartHour</key>
      <integer>9</integer>
      <key>UpdatesSuppressedStartMin</key>
      <integer>0</integer>
      <key>UpdatesSuppressedDurationMin</key>
      <integer>960</integer>
      <key>ConfigureDoNotTrack</key>
      <true/>
      <key>ConfigureShare</key>
      <integer>1</integer>
      <key>DefaultBrowserSettingEnabled</key>
      <false/>
      <key>DiagnosticData</key>
      <integer>0</integer>
      <key>HideFirstRunExperience</key>
      <true/>
      <key>HubsSidebarEnabled</key>
      <false/>
      <key>NewTabPageAllowedBackgroundTypes</key>
      <integer>3</integer>
      <key>NewTabPageAppLauncherEnabled</key>
      <false/>
      <key>NewTabPageContentEnabled</key>
      <false/>
      <key>NewTabPageHideDefaultTopSites</key>
      <true/>
      <key>OmniboxMSBProviderEnabled</key>
      <false/>
      <key>PasswordManagerEnabled</key>
      <false/>
      <key>PaymentMethodQueryEnabled</key>
      <false/>
      <key>PersonalizationReportingEnabled</key>
      <false/>
      <key>PromotionalTabsEnabled</key>
      <false/>
      <key>SendSiteInfoToImproveServices</key>
      <false/>
      <key>ShowMicrosoftRewards</key>
      <false/>
      <key>ShowOfficeShortcutInFavoritesBar</key>
      <false/>
      <key>ShowRecommendationsEnabled</key>
      <false/>
      <key>TrackingPrevention</key>
      <integer>2</integer>
      <key>UserFeedbackAllowed</key>
      <false/>
    </dict>
  </array>
  <key>PayloadDisplayName</key>
  <string>com.microsoft.Edge</string>
  <key>PayloadIdentifier</key>
  <string>com.example.edge</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>6BAC9A8B-19F3-4876-99D9-BCA6C8B30238</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>
```

## 相关文档和资源

[使用属性列表为 macOS 配置 Microsoft Edge 策略设置](https://learn.microsoft.com/zh-cn/deployedge/configure-microsoft-edge-on-mac)  
[Microsoft Edge - 策略](https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-policies)  
[Microsoft Edge - 更新策略](https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-update-policies)  
[Microsoft Edge - Update policies](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-update-policies)  
[Group Policy Administrative Templates Catalog - Microsoft Edge 商业版](https://admx.help/?Category=EdgeChromium&Language=zh-cn)  
[Group Policy Administrative Templates Catalog - Google Chrome](https://admx.help/?Category=Chrome&Language=zh-cn)  
[管理 Chrome 更新設定 (Mac)](https://support.google.com/chrome/a/answer/7591084?sjid=17692709497751188162-AP)  
[Github - ProfileCreator](https://github.com/ProfileCreator/ProfileCreator)  
[iMazing Profile Editor](https://imazing.com/profile-editor) 

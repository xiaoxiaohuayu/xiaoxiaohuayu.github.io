---
title: VSCode 使用硅基流动的 API 接入 DeepSeek
description: 本文介绍如何在VS Code中使用硅基流动API接入DeepSeek，详细说明注册硅基流动账号、创建API密钥及配置VS Code插件cline，并展示如何使用cline优化代码片段、项目依赖及新建项目等功能
tags: 
 - VSCode
 - AI

---

# VSCode 使用硅基流动的 API 接入 DeepSeek

> 由于近期 DeepSeek官方服务器压力较大，在 VS Code 中使用其 API 时，连接缓慢，很糟心。正好看到 硅基流动 近期也部署了 DeepSeek V3 以及 DeepSeek R1，于是转向使用三方的 API
>
> 硅基流动官方最近已上线接入cline的文档，可结合此文进行安装配置 [硅基流动 - 在 Cline 中使用](https://docs.siliconflow.cn/cn/usercases/use-siliconcloud-in-cline)

## 注册硅基流动账号并创建API 

### 1.注册

去 [注册地址](https://cloud.siliconflow.cn/i/38Vhbw8N) 注册即可，当前官方活动：新用户注册赠送 2000万 tokens，大约14R。同时，复制你的邀请码/邀请链接，邀请新用户使用手机号注册，也会赠送你 2000万 tokens。

![image-20250212110900917.png](https://www.helloimg.com/i/2025/02/12/67ac5a16e2232.png)

### 2. 创建API

进入左侧菜单 `API密钥` 后，选择 `新建API密钥`，输入描述后 `新建` 即可。创建完成后，列表会出现新建的密钥，点击名称即可复制

![image-20250212111021184.png](https://www.helloimg.com/i/2025/02/12/67ac5a15ae49c.png)

## VS Code上安装并配置插件 cline

### 1. 安装插件 cline

关于 cline 的介绍可以看这里 [Cline – OpenRouter 排名第一](https://github.com/cline/cline/blob/main/locales/zh-cn/README.md)，相比 Continue，除了英文界面之外，可以使用更多模型，能自动阅读整个项目，操作性更高

安装很简单，在 VS Code 的插件市场搜索 `cline` ，安装第一个插件就行

![image-20250211175939362.png](https://www.helloimg.com/i/2025/02/12/67ac5a14550e7.png)

### 2. 配置模型和API

安装完成后，编辑器左侧会出现一个机器人图标，点击图标，默认会展示模型设置区，我们需要在这里配置相关模型和API

![image-20250212135702072.png](https://www.helloimg.com/i/2025/02/12/67ac5a0e4a0b9.png)

`API Provider` 选择 `OpenAl Compatible`

`Base URl` 输入 `https://api.siliconflow.cn/v1`，这是硅基流动API的地址

`API Key` 需要复制好我们在硅基流动平台上创建的 API，粘贴进去

![image-20250212135230092.png](https://www.helloimg.com/i/2025/02/12/67ac5a112ea52.png)

`Model ID` 在硅基流动平台的模型广场里，点击我们要使用的模型，点开后复制模型名称，然后粘贴进去。我这边选择的是 `deepseek-ai/DeepSeek-V3`，也可以选择其他模型，我选择这个是感觉速度快一点。这里需要注意的是：**以 `Pro` 开头的模型一般需要有充值余额才可使用**

![image-20250212134932259.png](https://www.helloimg.com/i/2025/02/12/67ac5a1258af6.png)

> [!NOTE] 提示
> 但使用某个模型比较卡顿时，可随时切换到其他模型，只需修改`Model ID` ，其他地方不用修改



最后，按下 `Done` 保存配置，进入到对话聊天框，再对 cline 权限做一些配置

### 3. 配置 cline 权限

在对话框界面，我们 `勾选并点击` 对话框上方的选项，进入权限配置，然后根据自己的需求对部分选项打勾，赋予 cline 更多操作权限。这里我基本都是全打勾了，`Max Requests` 设置了 100

![image-20250212112954957.png](https://www.helloimg.com/i/2025/02/12/67ac5a13e0303.png)

## 使用

### 1. cline界面介绍

界面功能说明如下图，有一些不懂的设置，可以直接询问 cline，如：`cline插件的MCP Servers是干什么用的`、 `cline插件的 plan和act模式有什么区别` 等。

![image-20250212140844268.png](https://www.helloimg.com/i/2025/02/12/67ac5a106836d.png)

### 2. cline简单对话

点击 `+` 号图标，输入问题，等待回答，在输入框内可以继续提问；或者点击 `Start New Task` 开启一个新对话。默认中间区域展示对话历史，点击可查看。

需要注意的是，**cline 的所有功能都是依据对话来完成**，包括搭建项目，创建文件，优化代码等，没有自动补全，你可以输入提示让他帮你一直优化代码

![image-20250212142129451.png](https://www.helloimg.com/i/2025/02/12/67ac5a114f6f5.png)

### 3. 对话之 优化代码片段/文件/项目

复制一个文件路径，让他优化该文件的某某方法，例如：`优化 docs/.vitepress/theme/components/WTag/index.vue 文件中的 handleUrlState 方法`。

需要注意的是，cline 在编辑后如发现有错误，会自动识别并继续纠正，不需要我们再提示它，编辑过程中，不需要我们再操作

![image-20250212144413466.png](https://www.helloimg.com/i/2025/02/12/67ac5a11dbc0c.png)

升级项目所有的依赖，例如：`查看我的项目依赖，看看有哪些需要升级，需要注意的是我项目用 pnpm`

需要注意的是，一些高危操作，cline 会再对话区域弹出确认框，让我们确认后才继续操作

![image-20250212151718003.png](https://www.helloimg.com/i/2025/02/12/67ac5a1117689.png)

### 其他

新建项目/文件也是类似，这里不再举例。

需要注意的是：

1. 大胆提问题，让 cline 提交代码什么的也可以
2. 将你的需求尽量描述到位，如：创建什么项目/文件，在哪个位置，基础架构是什么等，可以减少提问次数，提高效率

## 扩展

### 硅基流动API的更多使用方法

多查看官方文档，如 [在 Obsidian Copilot 中使用](https://docs.siliconflow.cn/cn/usercases/use-siliconcloud-in-obsidian)。我们在 cline 中的 `Base URL` 配置来源就在此处。

甚至集成度更精细的  [API 调用](https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions)

硅基流动 [常见问题](https://docs.siliconflow.cn/cn/faqs/stream-mode)

### cline 更多介绍和方法

前往项目开源地址 [https://github.com/cline/cline/tree/main](https://github.com/cline/cline/tree/main)




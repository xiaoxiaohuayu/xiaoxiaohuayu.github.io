---
title: VSCode 接入DeepSeek V3大模型，附使用说明
description: 文章介绍了如何在 VSCode 中接入 DeepSeek V3 大模型，包括插件下载、API Key 注册与配置等，文章还介绍了 Continue 的对话提问、代码优化、自动补全和注释生成代码等功能。DeepSeek V3 是一个拥有 6710 亿参数的专家混合语言模型，支持国内使用，价格便宜。
tags: 
 - VSCode
 - AI

---

# VSCode 接入DeepSeek V3大模型，附使用说明

> [!WARNING] 提示
> 由于近期 DeepSeek 使用人数激增，服务器压力较大，~~官网已 **暂停充值入口**~~，官网目前已恢复充值，不过接口还是有些不稳定，也可以考虑使用第三方部署的 DeepSeek，如 [硅基流动](https://cloud.siliconflow.cn/i/38Vhbw8N) (使用教程查看我最新文章 [VS Code 使用硅基流动的 API 接入 DeepSeek](./vscode-siliconflow))等
> 
> 或者使用其他模型/插件，如 [豆包免费AI插件 MarsCode](https://www.marscode.cn/)、[阿里免费AI插件 TONGYI Lingma](https://marketplace.visualstudio.com/items?itemName=Alibaba-Cloud.tongyi-lingma)
>
> 或者一步到位，使用完全体的 AI编辑器 [Cursor](https://www.cursor.com/cn) (收费，每月$20，2周试用) / [Trae](https://www.trae.ai/) (完全免费，字节出品，中文更友好)

DeepSeek V3 是一个拥有 6710 亿参数的专家混合（MoE）语言模型。最新评估表明，DeepSeek V3 已经超越了其他开源模型。重点是：国内(不需要工具)，便宜(10块钱大约500万tokens)。

作为日常开发使用的编辑器 VSCode，直接开始接入 DeepSeek V3

## VSCode 上下载插件

VSCode 插件商店搜索 `Continue`，第一个下载就是

![image-20250103154346320.png](https://www.helloimg.com/i/2025/01/03/677797a8847e0.png)

> [!NOTE] 关于 Cline插件 和 Continue插件 的区别：
>
> + `Continue` 适合轻度辅助，帮你自动补全，优化代码，利用注释快速生成代码，最终由自己把控编码方向和进度
> + `Cline` 自由度更高，给予它更高权限后，可以帮你阅读优化整个项目，可以自动新增、删除文件、安装依赖，但是它的准确率对你的api要求更高，也需要你更多关注修改前后的内容。想要使用 `Cline` 可以看我这篇文章 [VS Code 使用硅基流动的 API 接入 DeepSeek](./vscode-siliconflow)

## 注册 DeepSeek V3

去 deepseek 官网 [https://www.deepseek.com/](https://www.deepseek.com/) ，选择 `接入api`，然后注册账号

![image-20250103154617154.png](https://www.helloimg.com/i/2025/01/03/677797a88d2b2.png)

注册完毕后，选择创建 `API Key`

![image-20250103154714100.png](https://www.helloimg.com/i/2025/01/03/677797a8ca2ee.png)

创建成功后，**记得复制这个 key 值，保存在其他地方，因为后面修改配置要用到，并且它只会出现 1 次**。



## VSCode 里配置

打开左侧的 `continue` 插件图标，点击上面的 `设置按钮`，进入编辑区域添加新模型。新增内容如下：

记得要替换 `apiKey` 的值要替换为刚刚注册 DeepSeek 后创建的 `API Key`

```json
{
  "models": [ 
    {
      "model": "deepseek-coder",
      "provider": "deepseek",
      "contextLength": 128000,
      // 替换为自己的 API Key
      "apiKey": "xxx", //  [!code highlight]
      "title": "DeepSeek v3"
    }
  ],
  "tabAutocompleteModel": {
    "title": "DeepSeek Coder",
    "provider": "deepseek",
    "model": "deepseek-coder",
    // 之前遗漏了，这块加上apiKey后tab补全才会生效
    "apiKey": "xxx", //  [!code highlight]
  },
}
```


![image-20250103155123230.png](https://www.helloimg.com/i/2025/01/03/677797a8b35af.png)

修改完成后，保存，然后选择面板左侧我们新添加的模型，点击对话开始试用。

![image-20250103155405192.png](https://www.helloimg.com/i/2025/01/03/677797a84f83b.png)

## 常用操作

### 1. 对话，提问

在对话框内输入然后回车，AI将自动回答，可以新建对话，也可以查看对话历史。

需要注意的是，你直接问题 `右侧文件`/`我的当前项目` 等笼统的文件目录时，它会提示无法直接阅读你说的目录，最好是复制一下文件全路径，粘贴到对话框提问，如图所示

文件全路径复制：右键文件或文件夹，选择 `复制路径` 即可

![image-20250117102928708.png](https://www.helloimg.com/i/2025/01/17/6789cc5c70ecb.png)

### 2. 对已打开的文件内容提问或者优化

在已打开文件内，选中代码片段，右键选择 `continue`，然后会弹出相关操作。

当你选择 `修复/优化代码` 后，`continue` 将自动开始修改代码。修改之后，新增的代码将显示绿色背景，移除的代码时红色背景。修改的代码片段上方有操作提示，选择接受 `Accept` 或者拒绝 `Reject`。

当有大范围的修改，不止一个代码片段时，如果你想取消可以按下 `ctrl+z` / `command+z`，接受修改的话只能一个一个点 `Accept`

![image-20250117103651091.png](https://www.helloimg.com/i/2025/01/17/6789cc5abb533.png)

### 3. tab 键自动补全代码

在配置文件中补全 `tabAutocompleteModel` 里的相关信息即可，在上文配置中有说明。

在编码或者书写时，会自动弹出补全的内容，如果你想使用它，直接按下 `tab` 键即可，或者点击提示按钮操作

![image-20250117105641391.png](https://www.helloimg.com/i/2025/01/17/6789cc5a2355d.png)

### 4. 输入注释，让它生成代码

输入注释后，一般需要等1-3s，它的补全内容才会出来，有时候只会出来部分代码，这时候按下 `tab` 键即可，后面它会继续补全

![image-20250117110400110.png](https://www.helloimg.com/i/2025/01/17/6789cc5b813a6.png)

如果补全的内容，有错误。可以鼠标放置在错误的地方，会提示 `快速修复`，点击之后，会弹出 `Ask Continue`，点击之后当前错误会自动粘贴到对话框，并自动回复给出 `解决方案/修改代码`。

鼠标放置在它给出的 `代码片段`上，右上角有三个按钮，第一个自动应用到出错的文件内容，第二个是插入当前代码到编辑器光标处，第三个是`复制`。这里建议复制代码，手动替换原来错误代码。第一个选项将在整个文件内搜索并修改，比较耗时，第二个是插入代码的位置是在光标处，不一定在当前的错误代码处。

![image-20250117111043009.png](https://www.helloimg.com/i/2025/01/17/6789cc5daa329.png)
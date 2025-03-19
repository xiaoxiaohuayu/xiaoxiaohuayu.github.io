---
title: AI 作画本地搭建
description: 该页面介绍了 Novel AI 和 NAI Diffusion，包括安装 Python 3.10.6、下载训练模型文件、运行 Stable Diffusion web UI 的步骤，以及配置国内镜像地址的方法。页面还提供了相关链接和截图，帮助用户顺利启动服务并开始使用 AI 作画功能
firstCommit: 2023-04-28 21:07:26+8:00
lastUpdated: 2023-12-14 20:13:56+8:00
tags:
  - AI
  - Python
  - Github
---

# AI 作画本地搭建

`Novel AI` （简称NAI）是一个线上的深度学习小说续写平台，而 `NAI Diffusion` 是 NAI 在2022年10月3日推出的基于 `Stable Diffusion` 算法的自动生成二次元图片的服务

## 在线版

`Novel AI` 官网：https://novelai.net/
进入官网，在首页最底端可以看到付费信息，免费套餐没有AI作画功能

## 本地搭建

使用 [`Stable Diffusion web UI`](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 开源项目，本地搭建

### 1. 安装`python 3.10.6`。

最新的版本不支持 `torch`。安装时选择 `Add Python to PATH`，默认是未选中的
下载 https://www.python.org/downloads/release/python-3106/
安装之后通过以下命令验证：

```sh
PS C:\Users\wyc> pip -V
pip 22.3.1 from D:\develop\python\lib\site-packages\pip (python 3.10)
```

### 2. 下载[`Stable Diffusion web UI`](https://github.com/AUTOMATIC1111/stable-diffusion-webui)。

下载到本地后解压，或者使用`git`命令`clone`
![images](https://www.helloimg.com/i/2025/01/02/677608d1721b7.png)

### 3. 下载训练模型文件

链接: https://pan.baidu.com/s/1Y1r05mwdXYkt1RTP4XfOXA?pwd=22yd 提取码: 22yd
将模型文件解压缩放到 `models` 目录下。
在 `models/Stable-diffusion` 里，可以看到这几个文件：
![images](https://www.helloimg.com/i/2025/01/02/677608d07576d.png)

### 4. 运行

在 `Stable Diffusion web UI` 根目录下右键运行 `webui.bat`
刚开始会下载一些依赖库，如图：
![images](https://www.helloimg.com/i/2025/01/02/677608d0aa882.png)

下载某些资源需要[飞行工具](https://note.weizwz.com/app/network/clash-verge)；
或者配置国内镜像地址：
在`C:\Users\Administrator\AppData\Roaming`目录下新建`pip/pip.ini`,若存在则修改。文件内容如下:

```text
[global]
index-url = http://pypi.douban.com/simple
[install]
trusted-host = pypi.douban.com
```

可用的其他国内镜像地址

```text
清华：https://pypi.tuna.tsinghua.edu.cn/simple
阿里云：http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
华中理工大学：http://pypi.hustunique.com/
山东理工大学：http://pypi.sdutlinux.org/
豆瓣：http://pypi.douban.com/simple/
```

下载完成之后，截图如下：
![images](https://www.helloimg.com/i/2025/01/02/677608d107077.png)

可以看到服务已经启动，在浏览器内输入`http://127.0.0.1:7860/`即可访问

### 5.访问

界面如下：
![images](https://www.helloimg.com/i/2025/01/02/677608d1db1d6.png)

### 6.安装插件

以汉化插件为例：

1. 切换到`Extensions`标签页
2. 选择`Install from URL`，然后输入插件地址`https://github.com/VinsonLaro/stable-diffusion-webui-chinese`
3. 点击`install`，安装完成后点击黄色按钮`Apply and restart UI`网页下方的`Reload UI`完成重启)
4. 点击`Settings`标签页，左侧点击`User interface`界面，在界面里最下方的`Localization (requires restart)`，选择`Chinese-All`或者`Chinese-English`
5. 点击界面最上方的黄色按钮`Apply settings`，再点击右侧的`Reload UI`即可完成汉化
   ![images](https://www.helloimg.com/i/2025/01/02/677608d0a9a4e.png)
   最新操作方法可查看 [stable-diffusion-webui-chinese](https://github.com/VinsonLaro/stable-diffusion-webui-chinese)
   汉化结果
   ![images](https://www.helloimg.com/i/2025/01/02/677608d4324ba.png)

**然后愉快的开始你的作画之旅吧💕~**

## 使用参考

[元素同典：确实不完全科学的魔导书](https://docs.qq.com/doc/DWFdSTHJtQWRzYk9k?&u=dab779abfaba4bf6a907580f3d00f90f)

[AI 杀疯了，NovelAI开源教程](https://zhuanlan.zhihu.com/p/575353301)

[元素法典——Novel AI 元素魔法全收录](https://docs.qq.com/doc/DWHl3am5Zb05QbGVs?&u=dab779abfaba4bf6a907580f3d00f90f)

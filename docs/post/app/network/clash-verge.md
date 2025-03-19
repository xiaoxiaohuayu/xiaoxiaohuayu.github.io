---
title: Clash Verge 使用记录：安装、配置
description: 这篇文章介绍了Clash Verge的下载、配置和使用方法。Clash Verge是一个基于Clash Meta内核的GUI代理工具，支持多种操作系统和代理协议。文章详细讲解了如何加速下载，日常编码如何正确使用代理，以及日常使用中出现的一些问题，文章最后还总结了常用的代理规则，对国内大部分网站都进行了优化，可以直接访问。
firstCommit: 2022-11-22 23:11:47+8:00
tags:
  - 代理
  - 应用程序
  - Github
  - npm
  - Git
---

# Clash Verge 使用记录：安装、配置

> `Clash Verge` 是代理工具 `Clash Meta` 内核的GUI图形客户端，支持Windows、Linux、macOS系统，分流规则功能强大且支持多种代理协议，如V2Ray、Trojan、Shadowsocks(R)、Socks等协议。

`Clash Verge` 更多详情可查看 ~~[clash-verge](https://github.com/zzzgydi/clash-verge)~~ ，2023年作者删库后又有其他开发者fork后继续开发，当前可用地址 [clash-verge-rev](https://github.com/wonfen/clash-verge-rev) ，本人在用的 [协议](https://invite.dginv.click/#/register?code=8mSXZUBJ)，有3日1G试用包，可先免费试用。

## 下载

建议到 [github官方库](https://github.com/wonfen/clash-verge-rev) 下载。

进入页面后，点击 `tags`，然后点击 `Releases`，下拉页面找到最新版本下的 `Assets` 标签，里面含有安装包和压缩包，找到对应自己系统的安装包下载即可。

![image](https://www.helloimg.com/i/2024/12/26/676ccca167947.jpg)

点击 `Show all 19 assets` 展开后，可看到所有安装包

![image](https://www.helloimg.com/i/2024/12/26/676ccca220740.jpg)

如果下载较慢，建议使用加速下载，右键链接选择复制，然后粘贴地址到 [Github加速网站](https://ghproxy.com/) 进行下载

![image](https://www.helloimg.com/i/2024/12/26/676ccca04b5f5.jpg)

## 开发环境配置

### 1. 修改 `git` 代理

同 `npm`，使用 `Clash Verge` 后，`git` 连接 `github` 时，也出现了连接网络的问题，需要给 `git` 设置代理。

```sh
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

只对 `github.com` 使用代理，其他仓库不走代理

```sh
git config --global http.https://github.com.proxy http://127.0.0.1:7897
git config --global https.https://github.com.proxy http://127.0.0.1:7897
```

取消代理，在 `--global` 后添加 `--unset`

```sh
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 2. 修改 `npm` 代理

使用 `Clash Verge` 时会自动开启系统代理服务器，此时使用 `npm` 会导致不能正常连接网络，需要为 `npm` 也配置此代理。
打开 `cmd` 或 `powershell`，通过命令行为 `npm` 设置代理

```sh
npm config set proxy http://127.0.0.1:7897
npm config set https-proxy http://127.0.0.1:7897
```

如果要取消代理

```sh
npm config delete proxy
npm config delete https-proxy
```

### 3. mac命令行中临时代理

```sh
export https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 all_proxy=socks5://127.0.0.1:7898
```

## 常见问题

大多数可参考 ~~[`Clash for Windows`文档](https://docs.cfw.lbyczf.com/contents/questions.html)~~， [Clash 中文网](https://clashcn.com/clash-verge)。

### 1. 停止使用 `Clash Verge` 后，`Windows` 不能上网

> [!NOTE] 提示
> `Clash Verge 1.2.0` 现在在关闭后可以自动关闭代理服务器了，但是在代理使用期间微软商店还是不能联网的，需要退出 `Clash Verge` 或者关闭 `系统代理` 后使用。如果你使用的是 `Clash for Windows`，则可以使用 `UWP Loopback` 解决此问题，[详情查看](https://docs.cfw.lbyczf.com/contents/ui/general.html#%E9%80%89%E9%A1%B9%E8%AF%B4%E6%98%8E)

目前在本人的win11中有出现，包含微软商店秒退等现象，是由于 `Clash Verge` 自动启动了代理服务器，手动关闭即可。

![image](https://www.helloimg.com/i/2024/12/26/676ccca0c7a4d.jpg)

点击 `编辑` ，手动关闭后保存，如果微软商店还不能联网，重启电脑即可。

![image](https://www.helloimg.com/i/2024/12/26/676ccca0c76ec.jpg)

### 2. 部分国内网站加载缓慢

譬如使用 `bing搜索` 时经常会提示重定向次数太多导致不能搜索。
这是因为你的订阅协议里的代理绕过网站配置不全，导致部分国内网站走了代理，反而导致加载缓慢。好在 `Clash Verge` 时可以增加绕过代理名单的。
打开 `Clash Verge` 面板，进入 `设置` -> 点击 `系统代理` 旁边的设置图标 -> 在 `代理绕过里` 增加你不想要走代理的网站即可。以下我的配置项：
以 `;` 号分隔的

<div class="code-wrap">

```txt
localhost;127.*;192.168.*;10.*;172.16.*;172.17.*;172.18.*;172.19.*;172.20.*;172.21.*;172.22.*;172.23.*;172.24.*;172.25.*;172.26.*;172.27.*;172.28.*;172.29.*;172.30.*;172.31.*;bing.com;cn.bing.com;gitee.com;baidu.com;sougou.com;so.com;quark.sm.cn;huya.com;douyu.com;bilibili.com;iqiyi.com;v.qq.com;youku.com;v.baidu.com;tv.souhu.com;tv.cctv.com;mgtv.com;miguvideo.com;douyin.com;toutiao.com;kuaishou.com;music.163.com;y.qq.com;kuwo.cn;kugou.com;xiami.com;music.migu.cn;music.douban.com;zhihu.com;weibo.com;youtiao.com;12306.cn;tieba.baidu.com;jianshu.com;juejin.cn;segmentfault.com;oschina.net;blog.csdn.net;cnblogs.com;iconfont.cn;wx.qq.com;meituan.com;ctrip.com;qunar.com;jd.com;taobao.com;pinduoduo.com;suning.com;tmall.com;vip.com;gome.com.cn;mogu.com;yhd.com;consumer.huawei.com;vivo.com.cn;mi.com;opposhop.cn;pan.baidu.com;lanzou.com;aliyundrive.com;ctfile.com;weiyun.com;cloud.189.cn;email.163.com;mail.qq.com;foxmail.com;mail.10086.cn;webmail30.189.cn;mail.sina.com.cn;mail.souhu.com;mail.wo.com.cn;mail.yahoo.com;mail.aliyun.com;mail.china.com;amap.com;map.qq.com;map.baidu.com;ditu.amap.com;docs.qq.com;docs.wps.cn;note.youdao.com;yuque.com;shimo.im;doc.weiyun.com;yinxiang.com;feishu.cn;zhipin.com;lanhuapp.com;bbs.oneplus.com;cloud.tencent.com;busuanzi.ibruce.info;wei.com;helloimg.com;helloimg.com;deepseek.com;music.126.net;imap.qq.com;iqiyipic.com;microsoft.com;marscode.com;marscode.cn;zijieapi.com;bytedance.com;doubao.com;deepseek.com;servicewechat.com;appleimap.163.com  
```
</div>

以 `,` 分隔的
<div class="code-wrap">

```txt
localhost,127.*,192.168.*,10.*,172.16.*,172.17.*,172.18.*,172.19.*,172.20.*,172.21.*,172.22.*,172.23.*,172.24.*,172.25.*,172.26.*,172.27.*,172.28.*,172.29.*,172.30.*,172.31.*,bing.com,cn.bing.com,gitee.com,baidu.com,sougou.com,so.com,quark.sm.cn,huya.com,douyu.com,bilibili.com,iqiyi.com,qq.com,youku.com,v.baidu.com,tv.souhu.com,tv.cctv.com,mgtv.com,miguvideo.com,douyin.com,toutiao.com,kuaishou.com,music.163.com,y.qq.com,kuwo.cn,kugou.com,xiami.com,music.migu.cn,music.douban.com,zhihu.com,weibo.com,youtiao.com,12306.cn,tieba.baidu.com,jianshu.com,juejin.cn,segmentfault.com,oschina.net,blog.csdn.net,cnblogs.com,iconfont.cn,wx.qq.com,meituan.com,ctrip.com,qunar.com,jd.com,taobao.com,pinduoduo.com,suning.com,tmall.com,vip.com,gome.com.cn,mogu.com,yhd.com,consumer.huawei.com,vivo.com.cn,mi.com,opposhop.cn,pan.baidu.com,lanzou.com,aliyundrive.com,ctfile.com,weiyun.com,cloud.189.cn,email.163.com,mail.qq.com,foxmail.com,mail.10086.cn,webmail30.189.cn,mail.sina.com.cn,mail.souhu.com,mail.wo.com.cn,mail.yahoo.com,mail.aliyun.com,mail.china.com,amap.com,map.qq.com,map.baidu.com,ditu.amap.com,docs.qq.com,docs.wps.cn,note.youdao.com,yuque.com,shimo.im,doc.weiyun.com,yinxiang.com,feishu.cn,zhipin.com,lanhuapp.com,bbs.oneplus.com,cloud.tencent.com,busuanzi.ibruce.info,wei.com,helloimg.com,helloimg.com,deepseek.com,music.126.net,imap.qq.com,iqiyipic.com,microsoft.com,marscode.com,marscode.cn,zijieapi.com,bytedance.com,doubao.com,deepseek.com,servicewechat.com,appleimap.163.com  
```
</div>

---
title: 给网站设置三级域名
description: 本文介绍了如何为使用 GitHub Pages 部署的网站设置三级域名。主要步骤包括在域名平台（如腾讯云）新增解析记录，并在 GitHub 项目设置中配置自定义域名
lastUpdated: 2024-12-30 18:53:35+8:00
tags: 
 - 网站
 - Github
---

# 给网站设置三级域名

> 适用于使用 `Github Pages` 部署的网站，域名平台不限，可以是腾讯云，也可以是阿里云

## 1. 域名站点新增解析

以腾讯云为例，新增解析记录如下红框内所示，其余解析记录之前是给主域名添加的，`185.199.111.153` 等都是 `github.io` 的IP地址

需要注意的是，添加的记录值为 `你的github账号名称.github.io`；主机记录的 `*` 是通配符，代表 `*.主域名.com`，`*` 可以是 blog 或 mail 等，如果你只是想给单个三级域名添加解析，则将 `*` 替换成单个的名称。

![image-域名站点新增解析](http://sto1fqpd6.hn-bkt.clouddn.com/6765283ca502f.png)

## 2. Github 项目设置

打开你的 Github 项目仓库，切换到 `settings` --> `Pages` --> `Custom domain`，然后填入上面配置的三级域名，保存即可。如果页面提示失败，可以稍等再试，因为平台的域名解析需要一段时间生效。

![image-Github项目设置](http://sto1fqpd6.hn-bkt.clouddn.com/67652880dd92a.png)



以上步骤完成后，可以输入地址测试你的网站了！:tada::tada::tada:


---
title: OPPO主题组件开发 - 组件内容自适应
description: 这篇文章介绍了OPPO主题组件开发中的自适应内容实现方法。主要包括两种方式：根据宽高等比例缩放和固定内容在中间。1文章通过示例代码详细说明了如何根据实际宽高比例调整组件内容，以及如何在特定条件下将内容固定在中间
firstCommit: 2023-10-08 14:03:00+8:00
lastUpdated: 2023-10-08 14:03:00+8:00
tags:
  - OPPO
  - Windows
---

# OPPO主题组件开发 - 组件内容自适应

> OPPO桌面有 `3*5、3*6、4*5、4*6、5*5、5*6` 等布局，随着布局不同，组件大小也会发生改变；不同型号手机分辨率不同，组件大小也不一致。这就要求组件内容做到自适应。

## 说明
OPPO主题组件自适应有两种表现方式，如下图所示。可以很明显的看到，第一种是根据宽高等比例缩放内容，第二种是固定内容在中间。
![image](https://www.helloimg.com/i/2025/01/02/6776482df221d.png)

## 1. 组件内容根据宽高等比例缩放
我们的设计宽高以450为基准，计算实际宽高和设计宽高的比率，然后在代码实现上用 `元素设计位置(x,y) x 比率` + `设计宽高 x 比率`，就可以实现内容根据宽高等比例缩放；此外还可以配合使用 `实际宽高 x 百分比` 的方式。示例如下：
```xml
<Var name="design_w" expression="450" />
<!-- 默认间距要求48 -->
<Var name="margin" expression="48" />
<Var name="ratio_x" expression="#view_width/#design_w" />
<Var name="ratio_y" expression="#view_height/#design_w" />
<!-- 组件实际宽高默认内置 #view_width、#view_height -->
<Group w="200*#ratio_x" h="#view_height">
	<Group w="52*#ratio_x" h="#view_height/2">
		<Text y="60*#ratio_y" w="#view_width-200*#ratio_x-#margin" text="测试" />
	</Group>
</Group>
```
## 2. 固定内容在中间
已知设计稿的尺寸是450，判断实际尺寸 `#view_width` 大于 `450+75` 的时候就内容居中。
`+75` 是 oppo圆角；一定要大于 `+75`的原因是自己做的背景避免被系统裁剪，那么我们实际制作的时候就可以使用整体宽度缩减一点、高度缩减一点的写法，即 `#view_width-(450 +75) > 0` 使用，示例如下：
```xml
<Var name="oppo_bg_x" expression="ifelse(gt(#view_width-525,0),1,0)" type="number" persist="true" />
<Var name="mjui_xfx" expression="ifelse(gt(#view_width-525,0),int(#view_width-525),0)" type="string" persist="true" />
<Var name="mjui_xfy" expression="ifelse(gt(#view_height-525,0),int(#view_height-525),0)" type="string" persist="true" />

<Var name="w" expression="#view_width+int(@mjui_xfx)" type="number" />
<Var name="h" expression="#view_height+int(@mjui_xfy)" type="number" />

<Var name="wx" expression="#w/450" type="number" />
<Var name="hy" expression="#h/450" type="number" />
<Image name="system" src="bg.png" isBackground="true" />

<Group x="abs(int(#mjui_xfx)/2)" y="abs(int(#mjui_xfy)/2)">
	<Image src="a.png" x="#wx*37" y="#hy*84" w="min(#wx*100,100)" h="min(#wx*100,100)" align="left" alignV="center" />
</Group>
```

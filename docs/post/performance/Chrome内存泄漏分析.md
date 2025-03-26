---
title: Chrome 内存泄漏分析
description: 内存泄漏分析
firstCommit: 2025-03-25 16:20:16+8:00
lastUpdated: 2025-03-26 10:10:21+8:00
tags:
  - Chrome
---

# Chrome 内存泄漏分析

## 导致内存泄漏的原因有如下四个⽅⾯：

1. 全局变量
2. 分离的DOM节点
3. 闭包
4. 控制台打印

> 注：尽量在隐⾝模式下进⾏调试。

（1）查看Google浏览器内存占⽤情况选择如下
![images|500x300](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%981.png)
![images|500x300](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%982.png)
（2）在Google Dev Tool 中的性能和内存两个⾯板。
性能：录制内存占⽤随时间变化的图像，对是否存在内存泄漏有⼀个直观的判断。
内存：定位问题发⽣的位置。

### 性能⾯板：

![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%983.png)
垃圾回收按钮是引擎⾃动控制的
1.⾸先刷新⻚⾯，然后⼿动强制垃圾回收
2.点击录制按钮，然后使其执⾏内存泄漏的⻚⾯操作，再次点击垃圾回收按钮，最后结束录制。
![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%984.png)
从图中发现，JS堆内存占⽤情况稳定上升，即使后续⼿动垃圾回收也没有使其下降，所以有理由怀疑存在内存泄漏。

### 内存⾯板:

* 堆快照
  ![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%985.png)
  （1）⾸先选择堆快照，然后⼿动点击垃圾回收按钮，进⾏第⼀次拍摄快照，为快照1。，其中会以构造器分类，（）括号的构造器和隐形实现的细节相关，可以先忽略。
  （2）再进⾏觉得会导致内存泄漏的操作进⾏完毕后，进⾏第⼆次拍摄快照，为快照2。
  （3）可以在摘要下，选择在快照1和快照2之间分配的对象，表示拍摄点之间创建的对象。
  （4）也选择快照2，然后将摘要切换成⽐较然后和快照1进⾏⽐较。
  ![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%986.png)
  ![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%987.png)
  ![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%988.png)
  ![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%989.png)
* 时间轴上的分配情况
  为了定位内存分配在代码中的位置，可以借助此模块进⾏分析。⾸先清空，然后刷新⻚⾯，点击录制按钮进⾏录制，⽽后触发可能内存溢出的操作，再点击垃圾回收按钮，最后停⽌检测。
  快照会出现蓝⾊竖条，表示该时刻分配了内存，如果后续被回收，就会出现灰⾊竖条，但是如果仍有保持蓝⾊的竖条，则表示当时截⽌的时间内存仍没有被回收，可以让我们看到内存的分配和回收的时机以及频率。可以选择⼀⼩段范围，观察该时刻内分配的对象类型。以及可以选择分配堆栈查到代码对应的位置。
  ![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%9810.png)
  ![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%9811.png)

## 全局变量

使⽤了过多的全局变量，存储⼤量的数据。
因为全局变量是直接挂在window下的不会被进⾏垃圾回收，是内存泄漏的⼀种可能情况。

## 分离的DOM节点

DOM的内存节点被回收，要满⾜两点：
节点从DOM树上被移除，并且代码中没有对他的引⽤，内存泄漏发⽣在节点从DOM树上删除了，但代码中留存着对他的JS引⽤，我们称之为分离的DOM节点。
如下所示：点击按钮list元素被移除DOM，表从界⾯上消失了，其功能失去了意义。但变量list的引⽤却还存在，所以list的节点内存⽆法被回收，这种情况我们可以使⽤堆快照进⾏排查
![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%9812.png)
注：此案例的解决⽅案是把list的赋值放在button的点击事件中。以避免制造出分离的DOM节点。
堆快照可以直接帮我们分析是否有分离的DOM节点。使⽤Detached进⾏过滤。
![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%9813.png)
分离的DOM节点导致的内存泄漏往往出⼈意料，以Table元素来说，如果代码中存在对某个单元格td的引⽤，则会导致整个Table元素⽆法被回收，因为每个DOM节点对其⽗元素的引⽤，通过td最终可以访达其上层的Table元素。

## 闭包

函数实例上的隐式指针会留存实例创建环境下的作⽤域对象。
![images](http://sto1fqpd6.hn-bkt.clouddn.com/github/Chrome%20%E5%86%85%E5%AD%9814.png)
此处并不是说⼀定有问题，只是说明闭包会带来内存占⽤，不合理的内存占⽤才被定性为内存泄漏。
通过内存⾯板->时间轴上的分配情况-> 观察蓝⾊竖条，会发现构造器中有*system / Context* 的字样，这表示存在函数导致的闭包留存。点开实例，选择第⼀项进⾏观察。

> 在写代码中尽量少⽤匿名函数，这样才可以在构造器中出现函数名。

## 控制台打印

打印中，引⽤了该变量，导致⽆法被GC回收，所以在⽣产环境中尽量移除打印。

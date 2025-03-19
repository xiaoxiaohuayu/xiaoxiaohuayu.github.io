---
title: JS 判断点是否在线段上
description: 本文介绍了如何利用向量的点积和叉积来判断一个点是否在线段上，并提供了相关的JavaScript代码示例。通过计算向量的点积和叉积，可以确定点是否在直线上或线段上
firstCommit: 2023-11-15 21:57:37+8:00
lastUpdated: 2023-11-23 16:10:03+8:00
tags:
  - JavaScript
---

# JS 判断点是否在线段上

> 本文利用向量的点积和叉积来判断点是否在线段上。

基础知识补充 [从零开始的高中数学——向量](https://zhuanlan.zhihu.com/p/350622845)、[向量的点积](https://zhuanlan.zhihu.com/p/425191437)、[带你一次搞懂点积（内积）、叉积（外积）](https://blog.csdn.net/apr15/article/details/106160407)、[Unity游戏开发——向量运算（点乘和叉乘](https://zhuanlan.zhihu.com/p/89046275)

## 说明
**点积可以用来判断两个向量的夹角，如果这个夹角是0或者180度，说明这个点在直线上；**
**叉积可以用来判断一个点到一条直线的距离，如果这个距离是0，说明这个点在直线上。**

假设有a、b、c三点，其中a和b是线段的两个端点，c是要判断的点：
1. 计算向量ab和ac的点积，记为dot。
+ 如果dot小于0，说明c在ab的垂直平分线上；
+ 如果dot等于ab的模长的平方，说明c在ab的延长线上；
+ 如果dot在0和ab的模长的平方之间，说明c在ab的方向上，可能在ab线段上；
+ 如果dot小于0或者大于ab的模长的平方，说明c不在ab的直线上，也不在ab线段上。
2. 计算向量ab和ac的叉积，记为cross。
+ 如果cross不等于0，说明c不在ab的直线上，也不在ab线段上；
+ 如果cross等于0，说明c在ab的直线上。
3. 当判断出c在ab的直线上时，还需要判断c的x坐标或者y坐标是否在a和b的x坐标或者y坐标之间，才能确定c是否在ab的线段上。

综合上面两个条件，叉积和点积都可以用来判断一个点是否在一条直线上，但是叉积更简单一些，因为它需要的条件更少。

## JS代码
```js
/**
 * 判断点c是否在ab组成的线段上
 * @param {x,y} a 点
 * @param {x,y} b 点
 * @param {x,y} c 点
 * @returns boolean
 */
function isPointOnLineSegment(a, b, c) {
  // 计算向量ab和ac的叉积
  let crossProduct = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  // 如果不等于0，说明不共线，直接返回false
  if (crossProduct !== 0) {
    return false;
  }
  // 否则，检查c点是否在ab线段的范围内
  return (
    Math.min(a.x, b.x) <= c.x &&
    c.x <= Math.max(a.x, b.x) &&
    Math.min(a.y, b.y) <= c.y &&
    c.y <= Math.max(a.y, b.y)
  );
}

// 测试
const a = {x:0,y:0}
const b = {x:0,y:1}
const c = {x:0,y:2}
const d = {x:1,y:1}
const e = {x:1,y:2}
const f = {x:2,y:2}

console.log(isPointOnLineSegment(a, c, b)); // true
console.log(isPointOnLineSegment(a, f, d)); // true
console.log(isPointOnLineSegment(c, f, e)); // true
console.log(isPointOnLineSegment(a, b, c)); // false
console.log(isPointOnLineSegment(a, f, c)); // false
console.log(isPointOnLineSegment(a, c, f)); // false
```
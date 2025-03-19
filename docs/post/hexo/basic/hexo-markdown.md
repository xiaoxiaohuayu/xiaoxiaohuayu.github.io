---
title: Hexo 博客常用标签/语法
description: 这篇文章主要介绍了 Hexo 博客中 Markdown 语法 的使用，包括 引用、图片、链接、表格、分割线、外挂标签、文字标签、行内图片 和 tab页签 等内容
firstCommit: 2024-01-02 10:50:15+8:00
lastUpdated: 2024-01-02 16:15:56+8:00
tags:
  - Hexo
  - Markdown
---

# Hexo 博客常用标签/语法

记录一些经常用的 markdown 语法

## markdown 语法

### 引用

可嵌套，内容可多段

```markdown
> 内容
```

效果：

> 内容

### 图片

```markdown
![image](图片url，可本地可在线)
```

### 链接

```markdown
[链接文字](链接url)
```

### 表格

```markdown
| 表头1 | 表头1 |
| ----- | ----- |
| 内容1 | 内容2 |
```

效果：

| 表头1 | 表头1 |
| ----- | ----- |
| 内容1 | 内容2 |

### 分割线

单独一行上使用三个或多个星号 (\*\*\*)、破折号 (---) 或下划线 (\_\_\_) ，并且不能包含其他内容

```markdown
内容1

---

内容2
```

效果：

内容1

---

内容2

## 外挂标签

参见 [hexo-theme-butterfly外挂标签](https://butterfly.js.org/posts/4aa8abbe/#%E6%A8%99%E7%B1%A4%E5%A4%96%E6%8E%9B%EF%BC%88Tag-Plugins%EF%BC%89)

### 文字标签

color 可选：default/blue/pink/red/purple/orange/green

```markdown
{% label text color %}
```

示例：

```markdown
臣亮言：{% label 先帝 %}创业未半，而{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}，此诚{% label 危急存亡之秋 red %}也！然侍衞之臣，不懈于内；{% label 忠志之士 purple %}，忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜{% label 开张圣听 orange %}，以光先帝遗德，恢弘志士之气；不宜{% label 妄自菲薄 green %}，引喻失义，以塞忠谏之路也。
```

效果：

![20250102_215650.png](https://www.helloimg.com/i/2025/01/02/67769b1685bd2.png)

### 行内图片

```markdown
{% inlineImg [src] [height] %}

[src] : 图片链接
[height] ： 图片高度限制【可选】
```

### tab页签

```markdown
{% tabs Unique name, [index] %}

<!-- tab [Tab caption] [@icon] -->

Any content (support inline tags too).

<!-- endtab -->

{% endtabs %}
```

示例：

```markdown
{% tabs test1 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

{% endtabs %}
```

效果：

![20250102_215719.png](https://www.helloimg.com/i/2025/01/02/67769b15ec337.png)

### 系列文章

和隐藏模块结合，示例：

```markdown
---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(1) - 项目初始化
cover: /img/cover/20231128_171922.png
tags:
  - vite
  - vue3
  - typescript
  - vscode
categories: 技术
abbrlink: 5bc77c26
date: 2023-11-09 17:03:24
series: vue3ViteTs
---

{% hideToggle 合集 - Vite4+Typescript+Vue3+Pinia 从零搭建 %}

{% series %}

{% endhideToggle %}
```

效果：

![20240102_133734.png](https://www.helloimg.com/i/2025/01/02/67768f1d78a7b.png)

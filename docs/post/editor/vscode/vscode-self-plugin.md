---
title: 自用 VSCode 插件
description: 这篇文章介绍了作者常用的 VSCode 插件，包括 EditorConfig for VS Code（用于定义编辑器编码格式规范）、Iconify IntelliSense（图标预览插件）和 Code Spell Checker（拼写检查插件）
firstCommit: 2023-04-25 14:06:46+8:00
lastUpdated: 2023-12-18 11:23:12+8:00
tags:
  - VSCode
  - 图标
---

# 自用 VSCode 插件

> 自用 `VSCode` 插件推荐

## 1. `EditorConfig for VS Code`
editorconfig 用来定义编辑器的编码格式规范，编辑器的行为会与 `.editorconfig` 文件中定义的一致，并且其优先级比编辑器自身的设置要高。
简单说明：在项目根目录下创建 `.editorconfi` 文件，然后设置好内容，则其他人更新后同步到本地，你们的代码规范就会保持一致。
我的 `.editorconfi` 文件内容：
```js
root = true                         # 根目录的配置文件，编辑器会由当前目录向上查找，如果找到`roor = true` 的文件，则不再查找

[*]
indent_style = space                # 空格缩进,可选"space"、"tab"
indent_size = 2                     # 缩进空格为2个
end_of_line = lf                    # 结尾换行符，可选"lf"、"cr"、"crlf"
charset = utf-8                     # 文件编码是 utf-8
trim_trailing_whitespace = true     # 不保留行末的空格
insert_final_newline = true         # 文件末尾添加一个空行
curly_bracket_next_line = false     # 大括号不另起一行
spaces_around_operators = true      # 运算符两遍都有空格
indent_brace_style = 1tbs           # 条件语句格式是 1tbs

[*.js]                              # 对所有的 js 文件生效
quote_type = single                 # 字符串使用单引号

[*.{html,less,css,json}]            # 对所有 html, less, css, json 文件生效
quote_type = double                 # 字符串使用双引号

[package.json]                      # 对 package.json 生效
indent_size = 2                     # 使用2个空格缩进
```

## 2. 图标预览插件 `Iconify IntelliSense`
代码里的图标在写下的瞬间，就能直接转化为对应的图标在代码编辑器里面显示出来。
![images](https://www.helloimg.com/i/2025/01/02/6775e8b6a6538.png)

## 3. `Code Spell Checker`
谁能保证没有拼写错误呢，有时候一个字母的错误让你找寻半天无解，使用此插件，即可将你的拼写错误直接展现出来。
![images](https://www.helloimg.com/i/2025/01/02/6775e8b705620.png)

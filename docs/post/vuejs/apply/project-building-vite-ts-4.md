---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(4) - 代码规范
description: 本文介绍了如何在Vite4、TypeScript、Vue3和Pinia项目中配置代码规范，主要包括EditorConfig、ESLint和Prettier的安装与配置步骤，旨在提高代码质量和维护效率
firstCommit: 2023-11-28 17:14:03+8:00
lastUpdated: 2023-11-28 17:14:03+8:00
tags:
  - Vue.js
  - Vite
  - TypeScript
  - VSCode
---

# Vite4+Typescript+Vue3+Pinia 从零搭建(4) - 代码规范

> 项目代码同步至码云 [weiz-vue3-template](https://gitee.com/weizwz/weiz-vue3-template)
>
> 要求代码规范，主要是为了提高多人协同和代码维护效率，结合到此项目，具体工作就是为项目配置 `eslint` 和 `prettier`。

## editorconfig

安装 `EditorConfig for VS Code` 插件，根目录下新建 `.editorconfig` 文件，增加以下配置

```
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
end_of_line = crlf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 120
```

如果是非windows系统，`end_of_line` 设置为 `cr`

## `eslint`

安装可以参考官方教程 [vue.js代码规范](https://cn.vuejs.org/guide/scaling-up/tooling.html#linting)。
在这里，我们建议使用另一种方式，安装后，通过命令初始化。

### 1. 安装

```sh
npm i eslint -D
```

### 2. 初始化

```sh
npm init @eslint/config
```

以下是操作实例：

```sh
PS D:\workspace\vue3\weiz-vue3-template> npm init @eslint/config
Need to install the following packages:
@eslint/create-config@0.4.6
Ok to proceed? (y)
# 输入y开始安装
? How would you like to use ESLint? ... # 如何使用eslint
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style # 检查语法、发现问题并强制执行代码风格
# 选择第三项
? What type of modules does your project use? ... # 项目使用哪种类型的模块
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
# 选择第一项
? Which framework does your project use? ... # 使用哪种框架
  React
> Vue.js
  None of these
# 选择 vue
? Does your project use TypeScript? » No / Yes # 项目里是否使用了ts
# 选择yes
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
# 代码运行环境，输入空格选择，可以多选
√ Browser
√ Node
# 都选中后回车
  Use a popular style guide # 使用一种流行的风格指南
> Answer questions about your style # 自定义你的style
# 选择第二项
? What format do you want your config file to be in? ... # 你的config配置文件类型
> JavaScript
  YAML
  JSON
# 建议选择js
? What style of indentation do you use? ... # 使用什么样的缩进风格
  Tabs
> Spaces
# 建议空格
? What quotes do you use for strings? ... # 字符串使用单引号还是双引号
  Double
> Single
# 单引号
? What line endings do you use? ... # 行尾格式
  Unix
> Windows
# Windows，如果是非windows系统，选择 unix
? Do you require semicolons? » No / Yes # 是否需要分号
# No
@typescript-eslint/eslint-plugin@latest eslint-plugin-vue@latest @typescript-eslint/parser@latest eslint@latest
? Would you like to install them now? » No / Yes
# 检查后列出以上项目，选择yes安装
? Which package manager do you want to use? ... # 使用哪种安装方式
> npm
  yarn
  pnpm
# 选择npm，然后等待安装完成
...
added 138 packages, changed 1 package, and audited 184 packages in 50s

39 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.cjs file in D:\workspace\vue3\weiz-vue3-template
```

安装完成，在根目录下生成了 `.eslintrc.cjs` 文件，并自带一些我们选择的配置。

### 3. 简易安装

通过以上安装我们发现，最终还是安装了4个依赖，`@typescript-eslint/eslint-plugin@latest eslint-plugin-vue@latest @typescript-eslint/parser@latest eslint@latest`，如果我们熟悉的话，后续就可以直接安装

```sh
npm i @typescript-eslint/eslint-plugin@latest eslint-plugin-vue@latest @typescript-eslint/parser@latest eslint@latest -D
```

然后在根目录下新建 `.eslintrc.cjs`，然后把我们常用的配置复制进去即可。

### 4. `.eslintrc.cjs` 配置

以下附带基础配置：

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended' // 后续兼容prettier
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
```

### 5. `.eslintignore`

根目录下新建 `.eslintignore` 文件，增加需要忽略类型检查的文件和目录

```js
node_modules
dist
public
*.md
*.txt
.vscode
index.html
```

### 6. 增加命令

修改 `package.json`

```json
"scripts": {
  "lint": "eslint --fix --ext .ts,.tsx,.vue,.js,.jsx --max-warnings 0"
}
运行 `npm run lint`，即可修复相关代码问题
```

## `prettier`

`prettier` 是为了方便格式化代码，它的安装比较简单，后两个依赖是为了解决和 `eslint` 的冲突

### 1. 安装

```sh
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

### 2. `.prettierrc`

根目录下新建 `.prettierrc` 文件，并增加以下配置

```js
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": false,
  "endOfLine": "crlf"
}
```

如果是非windows，`endOfLine` 设置为 `cr`

### 3. `.prettierignore`

根目录下新建 `.prettierignore` 文件，增加需要忽略格式化的文件和目录

```js
node_modules
dist
public
*.md
*.txt
.vscode
index.html
```

## 总结

做好以上配置后，可以运行 `npm run lint` 修复大部分代码格式问题，或者右键使用 `prettier` 格式化代码，将大大提高你的编码效率。

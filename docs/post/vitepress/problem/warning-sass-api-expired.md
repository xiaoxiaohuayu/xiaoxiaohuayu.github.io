---
title: Vitepress中警告Sass API过期：The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0
description: 本文介绍了在 Vitepress 1.5.0 中引入 Sass 后，控制台出现的告警：The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0。原因是部分API弃用。解决方案是修改配置以使用现代 API，并介绍了 处理其他告警如 Sass @import 规则弃用，以及修改自定义函数如 unquote()、length()、nth() 等的办法
tags: 
 - Sass
 - VitePress
 - Vite
 - webpack
---

# Vitepress中警告Sass API过期：The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0

Vitepress 1.5.0 中引入 Sass 后，控制台告警：`The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0`，虽然不是错误，但是看着很多很烦，于是上手解决一下并记录。

![image-20250106154230831.png](https://www.helloimg.com/i/2025/01/06/677b95262e2f8.png)

## 原因分析

通过告警提示里给的链接 [https://sass-lang.com/d/legacy-js-api](https://sass-lang.com/d/legacy-js-api) 我们可以找到原因：Dart Sass 最初使用的 API 基于 Node Sass 使用的 API，但是 在 Dart Sass 1.45.0 中，它被一个新的现代 API 所取代。遗留的 JS API 是 现已弃用，并将在 Dart Sass 2.0.0 中删除。

简而言之就是 **API变动，一些旧的语法被弃用，需要更换**

## 解决方案

查看官方提示，我们可以很快找到解决办法。旧版 JS API 将被完全删除在 Dart Sass 2.0.0 中，1.79.0版本 和 2.0 版本之间都只会有告警，你如果不在意可以不用修改当前代码。如果你想屏蔽这个告警，可以启用选项`silenceDeprecations: ['legacy-js-api']`：

```js
const sass = require('sass');

const result = sass.renderSync({
  silenceDeprecations: ['legacy-js-api'],
  ...
});
```

### Vite / Vitepress中配置

Vite 6 默认使用现代 API。以前版本的 Vite 仍然使用 legacy API，但从 Vite 5.4 开始，你可以通过设置来切换。查看官方说明 [https://cn.vite.dev/config/shared-options#css-preprocessoroptions](https://cn.vite.dev/config/shared-options#css-preprocessoroptions)

```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern", "legacy"
      },
    },
  },
})
```

由于 Vitepress 使用了 Vite 进行构建，所以修改类似：
::: code-group

```ts [.vitepress/config/index.ts]
import { defineConfig } from 'vitepress'

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    }
  },
})
```

:::

> [!NOTE] 提示
>
> 如果安装了`sass-embedded`，默认为`"modern-compiler"`，否则为 `"modern"`

###  webpack中配置

查看官方说明 [https://webpack.js.org/loaders/sass-loader/#api](https://webpack.js.org/loaders/sass-loader/#api)
，也是类似修改配置
::: code-group

```js [webpack.config.js]
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              sassOptions: {
                // Your sass options
              },
            },
          },
        ],
      },
    ],
  },
};
```

:::

## 其他告警

### Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0

也是一些语法将来会被弃用的告警

![image-20250106162215962.png](https://www.helloimg.com/i/2025/01/06/677b9526782cb.png)


直接根据提示修改相关内容即可

```
@import './index.scss';  // [!code --]
@use './index.scss'; // [!code ++]
```

### 自定义函数修改

1. `unquote()`：移除字符串中的引号，修改为 `string.unquote()` 
2. `length()`：获取列表的长度，修改为 `list.length()` 
3. `nth()`：获取列表中指定位置的元素，修改为 `list.nth()` 
4. `set-nth()`：设置列表中指定位置的元素，修改为 `list.set-nth()` 
5. `append()`：在列表末尾添加元素，修改为 `list.append()` 
6. `index()`：获取列表中指定元素的位置，修改为 `list.index()` 
7. `join()`：合并两个列表，修改为 `list.join()` 
8. `zip()`：将多个列表合并为一个列表，修改为 `list.zip()` 
9. `map-has-key()`：检查映射中是否存在特定键，修改为 `map.has-key()` 
10. `map-merge()`：合并两个映射，修改为 `map.merge()` 
11. `map-get()`：获取映射中指定键的值，修改为 `map.get()` 
12. `map-remove()`：从映射中移除指定键，修改为 `map.remove()` 
13. `map-keys()`：获取映射中的所有键，修改为 `map.keys()` 
14. `map-values()`：获取映射中的所有值，修改为 `map.values()` 

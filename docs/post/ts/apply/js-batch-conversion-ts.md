---
title: JS脚本批量处理TS数据类型
description: 本文介绍了如何使用JS脚本批量处理TS数据类型，包括处理数据字典中的数据和后台代码中复制的数据的详细步骤和方法
firstCommit: 2024-08-26 20:52:41+8:00
lastUpdated: 2024-08-26 20:52:41+8:00
tags:
  - TypeScript
  - JavaScript
---

# JS脚本批量处理TS数据类型

在TS开发中，经常会遇到后台数据字段比较多的情况，这时候需要一个个复制字段然后给他手动配置数据类型来完成我们的TS类型定义，相当麻烦。有什么快速的方法呢，我就目前遇到的两种情况分别写了JS脚本来处理后台数据，直接生成我们需要的数据格式。

## 脚本编写

### 1. 处理数据字典中的数据

一般数据字典表里的数据可能在excel文件里，也可能是在在线网页中，但它一般都是一个表格的形式，比如以下这种：

![20240826_205525.png](http://sto1fqpd6.hn-bkt.clouddn.com/677747d913115.png)

我们只需要复制前两列的内容，字段和字段类型。
明白我们的需求后，开始编写js脚本：

```js
// 定义一个方法
const dealDictionaryKey = (string) => {
  // 复制出来的数据是多行的形式，所以我们以'\n'去分开每一行数据
  const strArr = string.split('\n')
  let newString = ''
  // 遍历每行数据
  for (let item of strArr) {
    // 空白行跳过
    if (item.trim() === '') continue
    // 替换常用的后台数据类型为js类型，如果有遗漏请自行添加 /t是单元格字段和单元格类型之间的隔离符号
    item = item
      .replace(/\t/, ': ')
      .replace('INTEGER', 'number')
      .replace(/TIMESTAMP|DATE/, 'Date')
      .replace(/TEXT|VARCHAR\(\d*\)|CHAR\(\d*\)/, 'string')
    // 递归是因为可能一个字段里有多个下划线
    item = toUppercase(item)
    newString += item + ';\n'
  }
  console.log(newString)
}
// 递归字符串，替换字符串中每一个 下划线+小写字母 为 大写字母 的形式
const toUppercase = (str) => {
  const idx = str.indexOf('_')
  // 替换到没有下划线为止
  if (idx === -1) return str
  // 下划线+小写字母
  const oldStr = str.substr(idx, 2)
  // 生成的大写字母
  const initial = str.substr(idx + 1, 1).toUpperCase()
  // 替换
  str = str.replace(oldStr, initial)
  str = toUppercase(str)
  return str
}
// 赋值测试
const str = `
department_id	INTEGER
department_name	VARCHAR(125)
department_type	CHAR(1)
	
	
create_user	VARCHAR(25)
create_time	TIMESTAMP
update_user	VARCHAR(20)
update_time	TIMESTAMP

`
// 执行
dealDictionaryKey(str)
```

执行结果

```js
departmentId: number
departmentName: string
departmentType: string
createUser: string
createTime: Date
updateUser: string
updateTime: Date
```

### 2. 处理后台代码中复制的数据

我们直接查看后台代码，然后复制出来进行处理。后台代码一般形式如下：

![20240826_205744.png](http://sto1fqpd6.hn-bkt.clouddn.com/677747d9019ce.png)

我们直接复制花括号中的内容，进行处理。js脚本编写如下：

```js
// 定义一个方法
const dealServerKey = (str) => {
  // 复制出来的数据是多行的形式，所以我们以'\n'去分开每一行数据
  const strArr = str.split('\n')
  let newString = ''
  // 遍历每行数据
  for (let item of strArr) {
    // 空行跳过
    if (item.trim() === '' || item.indexOf('private') === -1) continue
    // 删除无用的private字段
    item = item.replace('private', '').replace(';', '').trim()
    // 先将字段和类型分开
    const keys = item.split(' ')
    const type = keys[0].replace(/Integer|BigDecimal/, 'number').replace('String', 'string')
    // 处理后调换位置
    newString += keys[1] + ': ' + type + ';\n'
  }
  console.log(newString)
}
// 输入测试
const str = `
    private Integer departmentId;

    private String departmentName;

    private String departmentType;

    private String departmentTypeName;

    private Date createTime;
`
// 执行
dealServerKey(str)
```

执行结果

```js
departmentId: number
departmentName: string
departmentType: string
departmentTypeName: string
createTime: Date
```

## 使用

脚本编写后，当然可以在浏览器控制台直接使用，每次的输入内容和调用执行需要手动替换。不过这样使用不太直观方便，我这边一般都会使用 `在线的执行js工具`，百度谷歌一搜很多。
以下以我使用的 [run-js](https://toolin.cn/run-js) 为例：

![20240826_205840.png](http://sto1fqpd6.hn-bkt.clouddn.com/677747d99bd3c.png)

将脚本复制到左侧代码框内，然后每次去替换 `str` 的赋值，点击中间的 `执行` 按钮，结果即可在右侧展示。
最后复制右侧内容到代码里即可。

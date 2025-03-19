---
title: JS 比较数值大小
description: 本文详细介绍了在 JavaScript 中比较数值大小的几种方法，并提供了每种方法的代码示例和详细解释，帮助读者理解和应用这些方法来比较数值大小
firstCommit: 2022-10-24 13:34:17+8:00
lastUpdated: 2023-12-05 11:11:33+8:00
tags:
  - JavaScript
---

# JS 比较数值大小

> 在前端开发中，比较数值大小是一个常见且重要的操作。无论是在处理数组数据还是在实现复杂算法时，掌握多种比较数值的方法都能提高代码的效率和可读性。

本文将详细介绍几种在 JavaScript 中常用的数值比较方法，并通过代码示例帮助读者更好地理解和应用这些技巧。

## 一、 简单循环算法

代码如下：

```js
const numbers = [5, 6, 2, 3, 7]
let max = -Infinity

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) max = numbers[i]
}
```

> [!NOTE] Infinity
>
> 1.  概述
>
>     全局属性 `Infinity` 是一个数值，表示无穷大。
>
> 2.  说明
>
> - `Infinity` 的初始值是 `Number.POSITIVE_INFINITY`。
> - `Infinity`（正无穷大）大于任何值。
> - 在 ECMAScript 5 的规范中， `Infinity` 是只读的。

3. 示例

```js
console.log(Infinity) /* Infinity */
console.log(Infinity + 1) /* Infinity */
console.log(Math.pow(10, 1000)) /* Infinity */
console.log(Math.log(0)) /* -Infinity */
console.log(1 / Infinity) /* 0 */
```

## 二、 `Math.max()`

### 1. 概述

`Math.max()` 函数返回作为输入参数的最大数字。

### 2. 参数

`value1, value2, … , valueN`
0 个或多个数字，将在其中选择，并返回最大的值。

### 3. 返回值

给定数值中最大的数。如果任一参数不能转换为数值，则返回 `NaN`。如果没有提供参数，返回 `-Infinity`。

### 4. 说明

`Math.max.length` 是 2，这从某种程度上表明了它旨在处理至少两个参数。

示例：

```js
Math.max(10, 20) //  20
Math.max(-10, -20) // -10
Math.max(-10, 20) //  20
```

### 5. 比较数组中值的大小

```js
const numbers = [5, 6, 2, 3, 7]
let maxNum = Math.max(...numbers)
```

> [!NOTE] 展开语法/扩展运算符 ...
>
> 1.  概述
>
>     展开语法 (Spread syntax), 可以在函数调用/数组构造时，将数组表达式或者 string 在语法层面展开；还可以在构造字面量对象时，将对象表达式按 key-value 的方式展开。(字面量一般指 `[1, 2, 3]` 或者 `{name: "mdn"}` 这种简洁的构造方式)。
>
> 2.  语法
>
> - 函数调用：`myFunction(...iterableObj)`;
> - 字面量数组构造或字符串：`[...iterableObj, '4', ...'hello', 6]`;
> - 构造字面量对象时，进行克隆或者属性拷贝：`let objClone = { ...obj }`;
>
> 展开语法和 `Object.assign()` 行为一致，执行的都是浅拷贝 (只遍历一层)。

## 三、`Function.prototype.apply()`

### 1. 概述

apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。

### 2. 参数 `apply(thisArg, argsArray)`

`thisArg`，在 func 函数运行时使用的 this 值。如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象。
`argsArray`，可选，一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。

### 3. 返回值

调用有指定 this 值和参数的函数的结果。

### 4. 使用

- 用 apply 将数组各项添加到另一个数组

```js
array.push.apply(array1, array2)
```

- 对于一些需要写循环以遍历数组各项的需求，我们可以用 apply 完成以避免循环。

```js
const numbers = [5, 6, 2, 3, 7]
// 使用 Math.min/Math.max 以及 apply 函数时的代码
let max = Math.max.apply(null, numbers)
// 基本等同于 Math.max(...numbers)
```

- 使用 apply 来链接构造器

```js
//创建一个全局 Global_Objects/Function 对象的 construct 方法，来使我们能够在构造器中使用一个类数组对象而非参数列表。
function MyConstructor() {
  for (let nProp = 0; nProp < arguments.length; nProp++) {
    this['property' + nProp] = arguments[nProp]
  }
}
let myArray = [4, 'Hello world!', false]
let myInstance = MyConstructor.construct(myArray)

console.log(myInstance.property1) // logs 'Hello world!'
console.log(myInstance instanceof MyConstructor) // logs 'true'
console.log(myInstance.constructor) // logs 'MyConstructor'
```

> [!NOTE] Object.prototype.constructor
>
> 1.  概述
>     constructor 属性返回 Object 的构造函数（用于创建实例对象）。此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。
> 2.  说明
>
>     所有对象（使用 Object.create(null) 创建的对象除外）都具有 constructor 属性。
>     在没有显式使用构造函数的情况下，创建的对象（例如对象和数组文本）将具有 constructor 属性，这个属性指向该对象的基本对象构造函数类型。
>
> 示例：
>
> ```js
> const o = {}
> o.constructor === Object // true
> const a = new Array()
> a.constructor === Array // true
> const n = new Number(3)
> n.constructor === Number // true
> ```

3. 使用

- 打印对象的构造函数

```js
function Tree(name) {
  this.name = name
}
const theTree = new Tree('Redwood')
console.log('theTree.constructor is ' + theTree.constructor)
```

- 改变对象的 constructor：
  可以为除了 null 和 undefined（因为这两者没有相应的构造函数）之外的任何类型指定 constructor 属性（如 String、Number、Boolean 等），但基本类型不会保留这些更改（也不会抛出异常）。

```js
let val = null
val.constructor = 1 // TypeError: val is null

val = 'abc'
val.constructor = Number // 不报错，但没有改变val.constructor === String
val.foo = 'bar' // 创建了一个String（'abc'）的隐式实例，并为其分配了prop foo
val.foo === undefined // true

let a = []
a.constructor = String
a.constructor === String // true
```

### 5. 与call的区别

call() 接受一个参数列表，而 apply() 接受一个参数的单数组。

## 四、 `Array.prototype.reduce()`

### 1. 概述

reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

### 2. 参数 `reduce(callbackFn, initialValue)`

`callbackFn`，一个“reducer”函数，包含四个参数：

- `previousValue`：上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]。
- `currentValue`：数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
- `currentIndex`：数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
- `array`：用于遍历的数组。

`initialValue` 可选
作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

### 3. 返回值

使用“reducer”回调函数遍历整个数组后的结果。

### 4. 示例

```js
const arr = [1, 2, 3]
const max = arr.reduce((a, b) => Math.max(a, b), -Infinity)
```

## 五、数组切块后循环传入目标

### 1. 概述

以上四种方法有超出 JavaScript 引擎参数长度上限的风险。一个方法传入过多参数（比如一万个）时的后果在不同 JavaScript 引擎中表现不同。如果你的参数组非常大，则可以选取这种方法。
**JavaScriptCore 引擎中有被硬编码的参数个数上限：65536。**

### 2. 示例

```js
function minOfArray(arr) {
  let min = Infinity
  const QUANTUM = 32768

  for (let i = 0, len = arr.length; i < len; i += QUANTUM) {
    const submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)))
    min = Math.min(submin, min)
  }
  return min
}
```

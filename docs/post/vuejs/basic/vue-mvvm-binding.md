---
title: Vue 双向绑定原理梳理
description: 这篇文章介绍了 Vue.js中双向绑定的原理。通过数据劫持和发布-订阅模式，使用 Object.defineProperty() 方法实现数据和视图的同步更新。文章还详细讲解了如何对数组进行劫持，使其响应式更新。
firstCommit: 2022-11-17 15:13:24+8:00
lastUpdated: 2022-11-29 18:31:16+8:00
tags:
  - Vue.js
---

# Vue 双向绑定原理梳理

> vue数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。

实现方式：`数据劫持` 结合 `发布者-订阅者` 模式。数据劫持通过 `Object.defineProperty()`方法。

## 原理说明

### 对对象的劫持

1. 构造一个监听器 `Observer` ，用来劫持并监听所有属性，添加到收集器 `Dep` 中，当数据发生变化的时候发出一个 `notice`（通知）。

2. 添加一个发布者 `Dep` , 用来收集订阅者 `Watcher` 和发布更新通知 。

   > [!NOTE] 提示
   > 视图中会用到 `data` 中的 `key` ，这称为依赖。同⼀个 `key` 可能出现多次，每次都需要收集出来用⼀个 `Watcher` 来维护它们，此过程称为依赖收集多个 `Watcher` 需要⼀个 `Dep` 来管理，需要更新时由 `Dep` 统⼀通知。

3. 构造一个订阅者 `Watcher` ，一方面接收监听器 `Observer` 通过 `Dep` 传递过来的数据变化，一方面执行自身绑定的回调函数（`update`）进行界面更新。

4. 实现一个解析器 `Compile` ，实现指令解析，初始化视图，并订阅数据变化，绑定好更新函数。

   > [!NOTE] 提示
   > 值得注意的是，解析器在解析DOM的时候，是用的 `DocumentFragment`，它是一个文档片段接口，表示一个没有父对象的最小文档对象，它的变化不会触发DOM树的重新渲染，性能优于直接操作DOM树。

![image](https://www.helloimg.com/i/2024/12/31/6773c01d22b97.jpg)

#### `Dep` 如何收集 `Watcher`

`Watcher` 在取值的时候让 `Dep.target` 指向 `this` 即当前的 `watcher`，取值结束之后，让 `Dep.target` 为 `null` ，这样就可以通过属性的 `get` 方法里面将当前的 `watcher` 添加到属性里面的实例 `dep` 中。

```js
// 通过获取操作, 触发属性里面的get方法
key.split('.').reduce((total, current) => total[current], vm._data)
// get 方法
get: function getter() {
  if (Dep.target) {
    // 在这里添加一个订阅者
    dep.addSub(Dep.target)
  }
  return val
}
```

### 对数组的劫持

由于数组不能直接使用 `Object.defineProperty()` 方法，所以它是这样操作的：

创建一个空对象继承Array的原型，然后创建了一个数组方法拦截器，在拦截器内重写了操作数组的一些方法（主要有7个:`push`，`pop`，`shift`，`unshift`，`splice`，`sort`，`reverse`），当数组实例使用操作数组方法时，先触发拦截器中的方法使数组数据变成响应式数据。

数组数据变成响应式数据的方法，和前面对象的类似，主要是修改了监听器 `Observer`，增加对数组的依赖收集和递归监听子元素，最后遍历数组，在循环内部如果有对象则进入对象的监听，触发依赖更新和监测新增元素通过拦截器。

## vue 双向绑定原理简单模拟

以上说明可结合vue源码或下面简单模拟进行理解
html部分

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>vue双向绑定原理</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-model="value" />
      <div>{{value}}</div>
      <br />
      <input type="text" v-model="data.input" />
      <div>{{data.input}}</div>
    </div>
  </body>
  <script src="js/vue.index.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data() {
        return {
          value: '输入框1',
          data: {
            input: '输入框2'
          }
        }
      }
    })
  </script>
</html>
```

js部分

```js
class Vue {
  constructor(options) {
    this.$options = options
    const vm = this
    if (this.$options.data) {
      this.initData(vm)
    }
    if (this.$options.el) {
      compile(this.$options.el, vm)
    }
  }
  initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    vm._data = data
    observe(data)
    for (let key in data) {
      proxy(vm, key, data[key])
    }
  }
}

// 代理：实现 vm.name 可以直接访问 vm._data.name
function proxy(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return target['_data'][key]
    },
    set(newValue) {
      target['_data'][key] = newValue
    }
  })
}

// 不是对象将被拦截
function observe(data) {
  if (data === null || typeof data !== 'object') {
    return
  }
  return new Observer(data)
}

// 监听器 这里只考虑对象了和对象嵌套, 没有考虑数组
class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 遍历对象的每一项, 进行监听和劫持
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]))
  }
}

// 通过defineProperty监听对象的属性并且给属性收集依赖
function defineReactive(target, key, value) {
  // 递归监听属性值是对象的属性
  observe(value)
  // 添加Dep实例, 收集依赖
  let dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(newValue) {
      value = newValue
      // 给新值添加监听
      observe(newValue)
      // 修改值的时候通知订阅者Watcher去更新
      dep.notify()
    }
  })
}

// 收集器 - 依赖收集
class Dep {
  constructor() {
    // 里面装的是收集的watcher
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 让收集到的所有watcher去更新
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

// 订阅者
class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm
    this.key = key
    this.callback = callback
    // 让 Dep.target 属性指向当前 watcher 实例
    Dep.target = this
    // reduce 逐个遍历数组元素, 每一步都将当前元素的值与上一步的计算结果相加
    // 通过 reduce, 触发 defineReactive 的 get 方法, 从而让 Dep 收集到
    key.split('.').reduce((total, current) => total[current], vm._data)
    Dep.target = null
  }
  update() {
    const value = this.key.split('.').reduce((total, current) => total[current], this.vm._data)
    this.callback(value)
  }
}

/** 解析模板
​ 使用 documentFragment 创建模板, 注意 fragment.append 会让被插入的 child 节点从父节点中移除, while 循环结束后, 页面就没了
​ 然后对模板里面的每一项进行解析：
 先实例 node.nodeType === 3 的元素, 表示文本节点, 看文本节点里面有没有匹配到 {{name}} 模板表达式的, 
   如果有, 从 vm._data 里面去取对应的值, 替换文本的值, 最后 vm.$el.appendChild(fragment) 就可以将替换后的结果显示在页面上
​ 对 nodeType === 1 的元素, 即标签解析, 这里我们假设处理的是 input, 
   获取节点的所有属性, 一个伪数组, 变成真数组, 里面有个 nodeName === v-model 和 nodeValue 对应 name 的, 
   同样获取 vm._data 里面 name 的值, 然后让节点的 node.value = 这个值, 就能显示在输入框里面了, 这就是数据改变视图。
   接下来是视图改变数据, 添加 input 方法, 为 node 添加 addEventListener方法, input, 然后让 vm._data 里面对应属性的值等于 e.target.value, 这样就实现了视图改变数据。
​ 重点: 上面的两种情况, nodeType == 3 的时候更新方法是 node.nodeValue = newValue, nodeType == 1 的时候更新方法是 node.value = newValue, 
    需要将这两个方法封装到 watcher 中, 在更新之后 new 一个 Watcher, 并将对应的参数传入, 后面在获取值的时候就会自动收集依赖, set 值的时候就会触发更新。
 * @param {Object} el
 * @param {Object} vm
 */
function compile(el, vm) {
  vm.$el = el = document.querySelector(el)

  const fragment = document.createDocumentFragment()
  let child
  while ((child = el.firstChild)) {
    fragment.append(child)
  }

  fragment_compile(fragment)

  function fragment_compile(node) {
    const parttern = /\{\{\s*(\S+)\s*\}\}/
    // 文本节点
    if (node.nodeType === 3) {
      // 匹配 {{}}, 第一项为匹配的内容, 第二项为匹配的变量名称
      const match = parttern.exec(node.nodeValue)
      if (match) {
        const needChangeValue = node.nodeValue
        // 获取到匹配的内容, 可能是 msg,   也可能是 mmm.msg,
        // 注意通过 vm[mmm.msg] 是拿不到数据的, 要 vm[mmm][msg]
        // 获取真实的值, 替换掉模板里面的 {{name}}, 真实的值从 vm.$options.data 里面取
        let arr = match[1].split('.')
        let value = arr.reduce((total, current) => total[current], vm._data)
        // 将真实的值替换掉模板字符串, 这个就是更新模板的方法, 将这个方法封装到 watcher 里面
        node.nodeValue = needChangeValue.replace(parttern, value)
        const updateFn = (value) => {
          node.nodeValue = needChangeValue.replace(parttern, value)
        }
        // 有个问题, node.nodeValue 在执行过一次之后, 值就变了, 不是 {{name}}, 而是真实值, 要将 {{name}} 里面的 name（即match[1]） 暂存起来
        new Watcher(vm, match[1], updateFn)
      }
      return
    }
    // 元素节点
    if (node.nodeType === 1 && node.nodeName === 'INPUT') {
      // 伪数组
      const attrs = node.attributes
      let attr = Array.prototype.slice.call(attrs)
      // 里面有个 nodeName === v-model,  有个 nodeValue 对应 name
      attr.forEach((item) => {
        if (item.nodeName === 'v-model') {
          let value = getVmValue(item.nodeValue, vm)
          // input 标签是修改 node.value
          node.value = value
          // 也需要添加 watcher
          new Watcher(vm, item.nodeValue, (newValue) => (node.value = newValue))
          // 添加 input 事件
          node.addEventListener('input', (e) => {
            const name = item.nodeValue
            // 给 vm 上的属性赋值
            // 不能直接 vm._data[name] = e.target.value , 因为 name 可能是 a.b 的形式
            // 也不能直接获取 b 的值, 然后赋新值, 因为这个值是一个值类型, 需要先获取前面的引用类型
            // 如: let tem = vm._data.a, 然后 tem[b] = 新值,  这样就可以达到 vm._data.a.b = 新值的效果
            const arr1 = name.split('.')
            const arr2 = arr1.slice(0, arr1.length - 1)
            const head = arr2.reduce((total, current) => total[current], vm._data)
            head[arr1[arr1.length - 1]] = e.target.value
          })
        }
      })
    }
    node.childNodes.forEach((child) => fragment_compile(child))
  }

  vm.$el.appendChild(fragment)
}

function getVmValue(key, vm) {
  return key.split('.').reduce((total, current) => total[current], vm._data)
}

function setVmValue(key, vm) {
  let tem = key.split('.')
  let fin = tem.reduce((total, current) => total[current], vm._data)
  return fin
}

window.Vue = Vue
```

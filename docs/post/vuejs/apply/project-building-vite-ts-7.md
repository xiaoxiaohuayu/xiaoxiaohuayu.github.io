---
title: Vite4+Typescript+Vue3+Pinia 从零搭建(7) - request封装
description: 这篇文章介绍了使用 Vite4、Typescript、Vue3 和 Pinia 从零开始搭建项目中如何 封装请求。文章详细讲解了如何基于 axios 封装请求，支持多域名请求地址，并提供了具体的代码示例和优化建议
firstCommit: 2023-12-19 17:37:23+8:00
lastUpdated: 2023-12-19 17:37:23+8:00
tags:
  - Vue.js
  - Axios
  - Vite
  - TypeScript
---

# Vite4+Typescript+Vue3+Pinia 从零搭建(7) - request封装

> 项目代码同步至码云 [weiz-vue3-template](https://gitee.com/weizwz/weiz-vue3-template)
>
> 基于 `axios` 封装请求，支持多域名请求地址

## 安装

```sh
npm i axios
```

## 封装

`utils` 目录下新建 `request` 文件夹，并新建 `index.ts`、`request.ts` 和 `status.ts` 文件。

### 1. `status.ts` 文件主要是封装状态码

```ts
export const ErrMessage = (status: number | string): string => {
  let message: string = ''
  switch (status) {
    case 400:
      message = '请求错误！请您稍后重试'
      break
    case 401:
      message = '未授权！请您重新登录'
      break
    case 403:
      message = '当前账号无访问权限！'
      break
    case 404:
      message = '访问的资源不存在！请您稍后重试'
      break
    case 405:
      message = '请求方式错误！请您稍后重试'
      break
    case 408:
      message = '请求超时！请您稍后重试'
      break
    case 500:
      message = '服务异常！请您稍后重试'
      break
    case 501:
      message = '不支持此请求！请您稍后重试'
      break
    case 502:
      message = '网关错误！请您稍后重试'
      break
    case 503:
      message = '服务不可用！请您稍后重试'
      break
    case 504:
      message = '网关超时！请您稍后重试'
      break
    default:
      message = '请求失败！请您稍后重试'
  }
  return message
}
```

此时，eslint会报 `switch` 前面的空格错误，需要修改 `.eslintrc.cjs` 里的 `indent`，修改后，错误消失。

```ts
rules: {
  // Switch语句 https://zh-hans.eslint.org/docs/latest/rules/indent#switchcase
  indent: ['error', 2, { SwitchCase: 1 }]
}
```

### 2. `request.ts` 主要是封装 `axios`

```ts
/**
 * 封装axios
 * axios 实例的类型为 AxiosInstance，请求需要传入的参数类型为 AxiosRequestConfig，响应的数据类型为 AxiosResponse，InternalAxiosRequestConfig 继承于 AxiosRequestConfig
 */
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ErrMessage } from './status'

// 自定义请求返回数据的类型
interface Data<T> {
  data: T
  code: string
  success: boolean
}

// 扩展 InternalAxiosRequestConfig，让每个请求都可以控制是否要loading
interface RequestInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean
}

// 拦截器
interface InterceptorHooks {
  requestInterceptor?: (config: RequestInternalAxiosRequestConfig) => RequestInternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
// 扩展 AxiosRequestConfig，showLoading 给实例默认增加loading，interceptorHooks 拦截
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptorHooks?: InterceptorHooks
}

class Request {
  config: RequestConfig
  instance: AxiosInstance
  loading?: boolean // 用loading指代加载动画状态

  constructor(options: RequestConfig) {
    this.config = options
    this.instance = axios.create(options)
    this.setupInterceptor()
  }

  // 类型参数的作用，T决定AxiosResponse实例中data的类型
  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, Data<T>>(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 封装常用方法
  get<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.request({ url, params, ..._object, method: 'GET' })
  }

  post<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.request({ url, params, ..._object, method: 'POST' })
  }

  delete<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.request({ url, params, ..._object, method: 'DELETE' })
  }

  patch<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.request({ url, params, ..._object, method: 'PATCH' })
  }

  put<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.request({ url, params, ..._object, method: 'PUT' })
  }

  // 自定义拦截器 https://axios-http.com/zh/docs/interceptors
  setupInterceptor(): void {
    /**
     * 通用拦截
     */
    this.instance.interceptors.request.use((config: RequestInternalAxiosRequestConfig) => {
      if (config.showLoading) {
        // 加载loading动画
        this.loading = true
      }
      return config
    })
    // 响应后关闭loading
    this.instance.interceptors.response.use(
      (res) => {
        if (this.loading) this.loading = false
        return res
      },
      (err) => {
        const { response, message } = err
        if (this.loading) this.loading = false
        // 根据不同状态码，返回不同信息
        const messageStr = response ? ErrMessage(response.status) : message || '请求失败，请重试'
        window.alert(messageStr)
        return Promise.reject(err)
      }
    )
    /**
     * 使用通用实例里的拦截，两个拦截都会生效，返回值以后一个执行的为准
     */
    // 请求拦截
    this.instance.interceptors.request.use(
      this.config?.interceptorHooks?.requestInterceptor,
      this.config?.interceptorHooks?.requestInterceptorCatch
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      this.config?.interceptorHooks?.responseInterceptor,
      this.config?.interceptorHooks?.responseInterceptorCatch
    )
  }
}

export default Request
```

### 3. `index.ts` 主要是创建 `Request` 实例

```ts
/**
 * 创建实例，可以多个，当你需要请求多个不同域名的接口时
 */
import Request from './request'
import { getToken } from '@/utils/auth'

const defRequest = new Request({
  // 这里用 Easy Mock 模拟了真实接口
  baseURL: 'https://mock.mengxuegu.com/mock/65421527a6dde808a695e96d/official/',
  timeout: 5000,
  showLoading: true,
  interceptorHooks: {
    requestInterceptor: (config) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return Promise.reject(err)
    }
  }
})

// 创建其他示例，然后导出
// const otherRequest = new Request({...})

export { defRequest }
```

## 使用

`src` 目录下新建 `api` 文件夹，并新建 `login.ts`

### 1. `login.ts`

```ts
import { defRequest } from '../utils/request'

export const loginApi = (params: any) => {
  // 设置 showLoading，timeout 会覆盖index.ts里的默认值
  return defRequest.post<any>('/login', params, { showLoading: false, timeout: 1000 })
}
```

### 2. 修改 `login.vue`

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@store/user'
  import { loginApi } from '@/api/login'

  defineOptions({
    name: 'V-login'
  })

  const userStore = useUserStore()
  const { userInfo, token } = storeToRefs(userStore)
  let userName = ref(userInfo.value.name)
  let userToken = ref(token)

  const updateUserName = () => {
    userStore.setUserInfo({
      name: userName.value
    })
  }
  const updateUserToken = () => {
    userStore.setToken(userToken.value)
  }

  const login = () => {
    loginApi({
      name: userName.value
    })
      .then((res) => {
        userName.value = res.name
        userToken.value = res.token
        updateUserToken()
      })
      .catch((err) => {
        console.log(err)
      })
  }
</script>

<template>
  <div>login page</div>
  name:
  <input type="text" v-model="userName" @input="updateUserName" />
  <br />
  token:
  <input type="text" v-model="userToken" />
  <hr />
  <button @click="login">login</button>
</template>

<style scoped></style>
```

点击 `login` 按钮，即可看到请求。

![images](https://www.helloimg.com/i/2025/01/02/677669f39e439.png)

## 说明

对于 `axios` 的封装和使用，这里要说明几点：

### 1. 为什么要使用 `InternalAxiosRequestConfig`

axios 源码有修改，拦截器传入和返回的参数不再是 `AxiosRequestConfig`，而是这个新类型 `InternalAxiosRequestConfig`
想要具体了解，可以查看这篇博文 https://blog.csdn.net/huangfengnt/article/details/131490913

### 2. `Request` 里的 `config` 参数

constructor 里的 `this.config` 会接受所有实例参数，所以通用实例拦截里使用的是 `this.config?.xxx`
通用拦截里使用的是 `config.showLoading`，而不是 `this.config.showLoading`，是为了我们在实际的 `api/login.ts` 里可以再传入 `showLoading`，以满足我们单个请求的要求。而通过 `this.config` 里获取的配置是 `request/index.ts` 里传入的配置。在 `config.showLoading` 之前我们可以打印下这两个 `config` ，`console.log(this.config, config)` 结果如下：

![images](https://www.helloimg.com/i/2025/01/02/677669f496bb5.png)

如果在 `login.ts` 里不传入 `showLoading`，那么 `config.showLoading` 会去拿通用实例 `request/index.ts` 里的 `showLoading`。
** 当然如果不需要全局加载动画，整个 `loading` 也都可以去掉 **

### 3. 总结下 `request/index.ts` 和 `api/login.ts` 里的参数有什么不同

`request/index.ts` 里可以建多个实例，一般以 `baseURL` 来判断是否要多个，它的参数是当前url下的通用参数，拦截规则也是；
`api/login.ts` 是具体的请求，它的大部分参数是url和请求传参。同一个 `baseURL` 下有的请求有特殊的要求，那你就可以去加一些参数。
总的来说，`request/index.ts` 是对 `baseURL` 一样的请求的封装，`request/request.ts` 是对所有请求的封装

### 4. 优化

- 因为 Easy Mock 的接口支持跨域，所以没有配到代理里去，如果是正常开发接口，还需要修改 `vite.config.ts` 里的 `proxy`。不过我们之前的教程里已有代理配置说明，这里便不再赘述
- `baseURL` 还可以放在 `env` 变量里，以便区分开发环境和生产环境
- ** 删除 `loading`，这里只是为了提供一种思路😂 **

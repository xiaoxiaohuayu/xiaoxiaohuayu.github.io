---
title: nginx配置解决跨域访问
description: 本文介绍了如何通过配置Nginx解决前后端分离项目中的跨域问题，详细讲解了开发和生产环境的配置方法，包括Vite、Axios和代理的使用，并提供了Nginx配置文件的示例
firstCommit: 2023-10-21 15:35:35+8:00
lastUpdated: 2023-10-21 15:35:35+8:00
tags:
  - nginx
  - 代理
  - Vite
  - Vue.js
  - Node.js
---

# nginx配置解决跨域访问

> 场景：前后的分离项目，前端vue框架，打包后放在Tomcat里访问，端口是8080，后端服务端口8058。访问前端项目时，调用后端接口报跨域。

## 后端环境

正常访问端口8058

<!-- ![image](/img/blog/20231021_1.png) -->
![image](https://www.helloimg.com/i/2025/01/02/677654e929e49.png)

经过nginx配置（文末具体展示）后，去除端口，如下：

<!-- ![image](/img/blog/20231021_2.png) -->
![image](https://www.helloimg.com/i/2025/01/02/677654e95975a.png)

## 前端开发环境

### 1. 配置开发和生产的环境变量

`.env.development`文件

```
# API服务路径
VITE_APP_BASE_URL = ""
```

`.env.production`文件

```
# API服务路径，注意没有端口号，是经过nginx处理后的后端服务地址
VITE_APP_BASE_URL = "http://192.168.1.4/"
```

### 2. `vite.config.ts` 文件配置开发代理

```ts
import { warpperEnv } from './build'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } = warpperEnv(loadEnv(mode, root))
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: '0.0.0.0',
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        '^/api': {
          target: 'http://192.168.1.4:8058',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
    // 后面省略...
  }
}
```

### 3. `http` 文件封装 `axios`，使用环境变量配置的基础API路径

```ts
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求地址
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // 请求超时时间
  timeout: 5000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
```

### 4. `api` 文件里使用示例

```ts
import { http } from '@/utils/http'

export type UserResult = {
  success: boolean
  data: {
    username: string
    roles: Array<string>
    accessToken: string
    refreshToken: string
    expires: Date
  }
}

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>('post', '/api/login', { data })
}
```

### 5. 开发环境项目预览

由于使用了代理，所以不会有跨域的问题，如图：

<!-- ![image](/img/blog/20231021_3.png) -->
![image](https://www.helloimg.com/i/2025/01/02/677654e965f14.png)

## 前端生产环境

生产环境采用Tomcat，前端项目打包好后，放在Tomcat的 `webapps/ROOT` 目录下即可，如图：

<!-- ![image](/img/blog/20231021_4.png) -->
![image](https://www.helloimg.com/i/2025/01/02/677654e9bc718.png)

启动Tomcat，双击 `apache-tomcat-8.5.93/bin/` 目录下的 `startup.bat`，linux机器到 `bin` 目录下，运行 `./startup.sh`

![image](https://www.helloimg.com/i/2025/01/02/677654f255dd7.png)

访问，Tomcat默认端口为8080，访问后台接口报跨域错误

![image](https://www.helloimg.com/i/2025/01/02/677654ea49296.png)

nginx配置后，去除端口，访问正常

![image](https://www.helloimg.com/i/2025/01/02/677654f0c60aa.png)

## nginx配置

以上可以看出，nginx配置的目的，就是去除前后端的端口差异，从而解决跨域的问题。配置文件 `nginx/conf/nginx.conf` 修改如下：

```
server {
  listen       80;
  # IP/域名都可以
  server_name  http://192.168.1.4;
  #charset koi8-r;
  #access_log  logs/host.access.log  main;

  location / {
    root   html;
    index  index.html index.htm;
    proxy_pass http://192.168.1.4:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_connect_timeout 5;
  }

  location ^~ /api/ {
    add_header 'Access-Control-Allow-Origin' $http_origin;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    if ($request_method = 'OPTIONS') {
      add_header 'Access-Control-Max-Age' 1728000;
      add_header 'Content-Type' 'text/plain; charset=utf-8';
      add_header 'Content-Length' 0;
      return 204;
    }
    proxy_pass http://192.168.1.4:8058/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_connect_timeout 5;
  }
}
```

## 疑问解答

### 1. 此示例项目，本地模拟的线上环境，操作系统 `windows`，后端服务 `nodejs`。换成 `linux` 系统或其他后端服务（如：`SpringBoot` 等）还适用吗，为什么？

答：同样适用。
因为跨域问题是浏览器为了安全保证，当你前端服务访问跨域资源时，被浏览器默认禁止了，所以和后端服务是什么，没有必然关系；所以解决问题的思路也是让我们的访问请求，达到浏览器的要求，即不跨域（同一域名/IP、端口、协议），那当然使用 `nginx` 就可以。

### 2. 前端请求里的代理里的 `^api`，和nginx配置里的 `^~ /api/` 有什么关系？

答：有关系，但是不是你想象的关系。
首先我们要确认，你的实际的请求地址里，其实不包含 `api` 这段路径。如图：

![image](https://www.helloimg.com/i/2025/01/02/677654ed6ae81.png)

开发环境加这个只是为了代理区分，因为你可能要请求多个不同域名的后端服务：我可以在 `vite.config.ts` 文件的 `proxy` 里再加一个以 `^/auth` 开头的，导向其他域名的后端服务。
其次代码里也可以看到 `rewrite: path => path.replace(/^\/api/, "")`，所以实际的请求地址，最终是去掉了 `api`。
那为什么nginx里要配置成 `api` 呢？
因为线上环境是没有运行代理的，也就是说 `rewrite: path => path.replace(/^\/api/, "")` 这一段是没有生效的，那你前端实际的请求地址就是 `http://192.168.1.4/api/login`，而真正的地址里没有 `api` 这一段，所以多出来的这一段，正好让nginx去代理，`^~ /api/` 变成 `http://192.168.1.4:8058/`，从而使请求地址变成 `http://192.168.1.4:8058/login`。

### 3. 接上，这两 `api` 虽然不是我想象的关系，但是事实上必须保持一致，有没有什么可以解耦的办法？

答：有。
nginx一般不会去随便改动，所以我们的解决办法优先放在前端，让前端去适配nginx。
参考 `vite.config.ts` 文件的代理地址替换，那我们在实际请求地址时，也可以做一个替换处理：在 `http` 文件里的请求拦截器中，判断是否生产环境，如果是，则替换 `^api` 为nginx配置的开头路径即可。

### 4. 接上，`vite.config.ts` 可以配置多个代理，nginx也可以配置多个后端服务，但是 `http` 文件里的 `axios` 封装只有一个 `baseURL`？

答：不是有拦截器吗。
`env` 环境配置里增加多个域名字段，假如以 `auth` 开头是另一个域名，那就在拦截器里使用条件判断，如果是 `auth` 开头，修改 `config.baseURL` 地址。
或者封装多个 `axois`？不建议，代码重复率又高了。

### 5. 既然nginx已经把 `api` 开头的都代理到了后端服务，那我前端就不能有 `api` 开头的路由？

答：可以。
看看访问路径，前端是哈希路由，有 `#` 号分隔的。如果是 `history` 路由呢，有试过的同学可以在评论区吱个声😜。

